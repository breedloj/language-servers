import { convertChunksToRelevantTextDocuments } from './relevantTextDocuments'
import { Chunk } from 'local-indexing'

describe('convertChunksToRelevantTextDocuments', () => {
    it('should convert single chunk correctly', () => {
        const chunk: Chunk = {
            filePath: 'test.js',
            relativePath: 'src/test.js',
            content: 'console.log("hello")',
            programmingLanguage: 'javascript',
            startLine: 1,
            id: '1',
            index: 0,
            vec: [],
        }

        const result = convertChunksToRelevantTextDocuments([chunk])

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({
            relativeFilePath: 'src/test.js',
            programmingLanguage: { languageName: 'javascript' },
            text: 'console.log("hello")',
        })
    })

    it('should combine multiple chunks from same file', () => {
        const chunks: Chunk[] = [
            {
                filePath: 'test.js',
                relativePath: 'src/test.js',
                content: 'const a = 1;',
                programmingLanguage: 'javascript',
                startLine: 2,
                id: '1',
                index: 0,
                vec: [],
            },
            {
                filePath: 'test.js',
                relativePath: 'src/test.js',
                content: 'console.log(a);',
                programmingLanguage: 'javascript',
                startLine: 1,
                id: '2',
                index: 1,
                vec: [],
            },
        ]

        const result = convertChunksToRelevantTextDocuments(chunks)

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({
            relativeFilePath: 'src/test.js',
            programmingLanguage: { languageName: 'javascript' },
            text: 'console.log(a);\nconst a = 1;',
        })
    })

    it('should handle empty or undefined content', () => {
        const chunks: Chunk[] = [
            {
                filePath: 'test.js',
                relativePath: 'src/test.js',
                content: '',
                programmingLanguage: 'javascript',
                startLine: 1,
                id: '1',
                index: 0,
                vec: [],
            },
            {
                filePath: 'test.js',
                relativePath: 'src/test.js',
                content: '',
                programmingLanguage: 'javascript',
                startLine: 2,
                id: '2',
                index: 1,
                vec: [],
            },
        ]

        const result = convertChunksToRelevantTextDocuments(chunks)

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({
            relativeFilePath: 'src/test.js',
            programmingLanguage: { languageName: 'javascript' },
        })
    })

    it('should handle unsupported programming language', () => {
        const chunk: Chunk = {
            filePath: 'test.xyz',
            relativePath: 'src/test.xyz',
            content: 'some content',
            programmingLanguage: 'unsupported',
            startLine: 1,
            id: '1',
            index: 0,
            vec: [],
        }

        const result = convertChunksToRelevantTextDocuments([chunk])

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({
            relativeFilePath: 'src/test.xyz',
            text: 'some content',
        })
    })

    it('should truncate relative file path if exceeds limit', () => {
        const longPath = 'a'.repeat(5000)
        const chunk: Chunk = {
            filePath: 'test.js',
            relativePath: longPath,
            content: 'console.log("hello")',
            programmingLanguage: 'javascript',
            startLine: 1,
            id: '1',
            index: 0,
            vec: [],
        }

        const result = convertChunksToRelevantTextDocuments([chunk])

        expect(result).toHaveLength(1)
        expect(result[0].relativeFilePath?.length).toBe(4000)
    })

    it('should handle multiple files', () => {
        const chunks: Chunk[] = [
            {
                filePath: 'test1.js',
                relativePath: 'src/test1.js',
                content: 'file1 content',
                programmingLanguage: 'javascript',
                startLine: 1,
                id: '1',
                index: 0,
                vec: [],
            },
            {
                filePath: 'test2.js',
                relativePath: 'src/test2.js',
                content: 'file2 content',
                programmingLanguage: 'javascript',
                startLine: 1,
                id: '2',
                index: 1,
                vec: [],
            },
        ]

        const result = convertChunksToRelevantTextDocuments(chunks)

        expect(result).toHaveLength(2)
        expect(result[0].text).toBe('file1 content')
        expect(result[1].text).toBe('file2 content')
    })

    it('should handle chunks without relativePath', () => {
        const chunk: Chunk = {
            filePath: 'test.js',
            content: 'console.log("hello")',
            programmingLanguage: 'javascript',
            startLine: 1,
            id: '1',
            index: 0,
            vec: [],
        }

        const result = convertChunksToRelevantTextDocuments([chunk])

        expect(result).toHaveLength(1)
        expect(result[0].relativeFilePath).toBeUndefined()
    })

    it('should handle chunks without startLine', () => {
        const chunks: Chunk[] = [
            {
                filePath: 'test.js',
                relativePath: 'src/test.js',
                content: 'const a = 1;',
                programmingLanguage: 'javascript',
                id: '1',
                index: 0,
                vec: [],
            },
            {
                filePath: 'test.js',
                relativePath: 'src/test.js',
                content: 'console.log(a);',
                programmingLanguage: 'javascript',
                id: '2',
                index: 1,
                vec: [],
            },
        ]

        const result = convertChunksToRelevantTextDocuments(chunks)

        expect(result).toHaveLength(1)
        expect(result[0].text).toBe('const a = 1;\nconsole.log(a);')
    })

    it('should not include documentSymbols in the result', () => {
        const chunk: Chunk = {
            filePath: 'test.js',
            relativePath: 'src/test.js',
            content: 'console.log("hello")',
            programmingLanguage: 'javascript',
            startLine: 1,
            id: '1',
            index: 0,
            vec: [],
        }

        const result = convertChunksToRelevantTextDocuments([chunk])

        expect(result).toHaveLength(1)
        expect(result[0]).not.toHaveProperty('documentSymbols')
    })
})
