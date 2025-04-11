import {
    Logging,
    QueryInlineProjectContextParams,
    QueryInlineProjectContextResult,
    QueryVectorIndexParams,
    QueryVectorIndexResult,
    WorkspaceFolder,
    ContextConfiguration,
} from '@aws/language-server-runtimes/server-interface'
import { dirname } from 'path'
import { languageByExtension } from '../../shared/languageDetection'
import type { UpdateMode, VectorLibAPI } from 'local-indexing'

const fs = require('fs')
const path = require('path')
const LIBRARY_DIR = path.join(dirname(require.main!.filename), 'indexing')

import ignore = require('ignore')
const { fdir } = require('fdir')

export interface SizeConstraints {
    maxFileSize: number
    remainingIndexSize: number
}

export class LocalProjectContextController {
    private static instance: LocalProjectContextController | undefined

    private readonly fileExtensions: string[]
    private readonly workspaceFolders: WorkspaceFolder[]
    private readonly clientName: string
    private _vecLib?: VectorLibAPI
    private log: Logging
    private readonly defaultConfig: ContextConfiguration = {
        ignoreFilePatterns: [],
        includeSymLinks: false,
        maxFileSizeMb: 10,
        maxIndexSizeMb: 100,
        fileExtensions: Object.keys(languageByExtension),
    }

    constructor(clientName: string, workspaceFolders: WorkspaceFolder[], logging: Logging) {
        this.fileExtensions = Object.keys(languageByExtension)
        this.workspaceFolders = workspaceFolders
        this.clientName = clientName
        this.log = logging
    }

    public static getInstance() {
        if (!this.instance) {
            throw new Error('LocalProjectContextController not initialized')
        }
        return this.instance
    }

    public async init(vectorLib?: any): Promise<void> {
        try {
            const vecLib = vectorLib ?? (await import(path.join(LIBRARY_DIR, 'dist', 'extension.js')))
            const root = this.findCommonWorkspaceRoot(this.workspaceFolders)
            this._vecLib = await vecLib.start(LIBRARY_DIR, this.clientName, root)
            LocalProjectContextController.instance = this
        } catch (error) {
            this.log.error('Vector library failed to initialize:' + error)
        }
        await this.updateConfiguration()
    }

    public async dispose(): Promise<void> {
        if (this._vecLib) {
            await this._vecLib?.clear?.()
            this._vecLib = undefined
        }
    }

    public async updateConfiguration(): Promise<void> {
        try {
            if (this._vecLib) {
                const sourceFiles = await this.processWorkspaceFolders(
                    this.workspaceFolders,
                    this.defaultConfig.ignoreFilePatterns,
                    this.defaultConfig.includeSymLinks,
                    this.defaultConfig.fileExtensions,
                    this.defaultConfig.maxFileSizeMb,
                    this.defaultConfig.maxIndexSizeMb
                )
                const rootDir = this.findCommonWorkspaceRoot(this.workspaceFolders)
                await this._vecLib?.buildIndex(sourceFiles, rootDir, 'all')
            }
        } catch (error) {
            this.log.error(`Error in GetConfiguration: ${error}`)
        }
    }

    public async updateIndex(filePaths: string[], operation: UpdateMode): Promise<void> {
        if (!this._vecLib) {
            return
        }

        try {
            await this._vecLib?.updateIndexV2(filePaths, operation)
        } catch (error) {
            this.log.error(`Error updating index: ${error}`)
        }
    }

    public async queryInlineProjectContext(
        params: QueryInlineProjectContextParams
    ): Promise<QueryInlineProjectContextResult> {
        if (!this._vecLib) {
            return { inlineProjectContext: [] }
        }

        try {
            const resp = await this._vecLib?.queryInlineProjectContext(params.query, params.filePath, params.target)
            return { inlineProjectContext: resp ?? [] }
        } catch (error) {
            this.log.error(`Error in queryInlineProjectContext: ${error}`)
            return { inlineProjectContext: [] }
        }
    }

    public async queryVectorIndex(params: QueryVectorIndexParams): Promise<QueryVectorIndexResult> {
        if (!this._vecLib) {
            return { chunks: [] }
        }

        try {
            const resp = await this._vecLib?.queryVectorIndex(params.query)
            return { chunks: resp ?? [] }
        } catch (error) {
            this.log.error(`Error in queryVectorIndex: ${error}`)
            return { chunks: [] }
        }
    }

    private meetsFileSizeConstraints(filePath: string, sizeConstraints: SizeConstraints): boolean {
        let fileSize

        try {
            fileSize = fs.statSync(filePath).size
        } catch (error) {
            this.log.error(`Error reading file size for ${filePath}: ${error}`)
            return false
        }

        if (fileSize > sizeConstraints.maxFileSize || fileSize > sizeConstraints.remainingIndexSize) {
            return false
        }
        sizeConstraints.remainingIndexSize -= fileSize
        return true
    }

    public async processWorkspaceFolders(
        workspaceFolders?: WorkspaceFolder[] | null,
        ignoreFilePatterns?: string[],
        includeSymLinks?: boolean,
        fileExtensions?: string[],
        maxFileSizeMb?: number,
        maxIndexSizeMb?: number
    ): Promise<string[]> {
        if (!workspaceFolders?.length) {
            return []
        }

        const filter = ignore().add(ignoreFilePatterns ?? [])

        const sizeConstraints: SizeConstraints = {
            maxFileSize: maxFileSizeMb !== undefined ? maxFileSizeMb * 1024 * 1024 : Infinity,
            remainingIndexSize: maxIndexSizeMb !== undefined ? maxIndexSizeMb * 1024 * 1024 : Infinity,
        }
        const controller = new AbortController()
        const { signal } = controller

        const workspaceSourceFiles = workspaceFolders.reduce((allFiles: string[], folder: WorkspaceFolder) => {
            const absolutePath = path.resolve(new URL(folder.uri).pathname)

            const crawler = new fdir()
                .withSymlinks({ resolvePaths: !includeSymLinks })
                .exclude((dirName: string, dirPath: string) => {
                    return filter.ignores(path.relative(absolutePath, dirPath))
                })
                .glob(fileExtensions?.map(ext => `**/*${ext}`))
                .withAbortSignal(signal)
                .filter((filePath: string, isDirectory: boolean) => {
                    if (sizeConstraints.remainingIndexSize <= 0) {
                        controller.abort()
                        return false
                    }

                    if (isDirectory || filter.ignores(path.relative(absolutePath, filePath))) {
                        return false
                    }

                    return (
                        (maxFileSizeMb === undefined && maxIndexSizeMb === undefined) ||
                        this.meetsFileSizeConstraints(filePath, sizeConstraints)
                    )
                })

            const sourceFiles = crawler.crawl(absolutePath).sync()

            return [...allFiles, ...sourceFiles]
        }, [] as string[])

        return workspaceSourceFiles
    }

    private findCommonWorkspaceRoot(workspaceFolders: WorkspaceFolder[]): string {
        if (!workspaceFolders.length) {
            throw new Error('No workspace folders provided')
        }
        if (workspaceFolders.length === 1) {
            return new URL(workspaceFolders[0].uri).pathname
        }

        const paths = workspaceFolders.map(folder => new URL(folder.uri).pathname)
        const splitPaths = paths.map(p => p.split(path.sep).filter(Boolean))
        const minLength = Math.min(...splitPaths.map(p => p.length))

        let lastMatchingIndex = -1
        for (let i = 0; i < minLength; i++) {
            const segment = splitPaths[0][i]
            if (splitPaths.every(p => p[i] === segment)) {
                lastMatchingIndex = i
            } else {
                break
            }
        }

        if (lastMatchingIndex === -1) {
            return new URL(workspaceFolders[0].uri).pathname
        }
        return path.sep + splitPaths[0].slice(0, lastMatchingIndex + 1).join(path.sep)
    }
}
