# Changelog

## [0.1.5](https://github.com/breedloj/language-servers/compare/chat-client/v0.1.4...chat-client/v0.1.5) (2025-04-22)


### Features

* add [@workspace](https://github.com/workspace) context in agentic chat ([#1029](https://github.com/breedloj/language-servers/issues/1029)) ([f2916f4](https://github.com/breedloj/language-servers/commit/f2916f45c351a42a9951ff00bcb7f7eed3ce7274))
* add context transparency feature ([#903](https://github.com/breedloj/language-servers/issues/903)) ([9432ffb](https://github.com/breedloj/language-servers/commit/9432ffb8586e4f8181c4f14944b0d3d32aff3e78))
* add explanation text as directive ([#1054](https://github.com/breedloj/language-servers/issues/1054)) ([a0ca8e0](https://github.com/breedloj/language-servers/commit/a0ca8e0059a26ac7f21e04940ad120c3de268df9))
* add header and buttons to chat response ([#1020](https://github.com/breedloj/language-servers/issues/1020)) ([ada6c7f](https://github.com/breedloj/language-servers/commit/ada6c7fd36dc9f64f093d7629e957d23e322848d))
* add pair programming card ([#1023](https://github.com/breedloj/language-servers/issues/1023)) ([59cf153](https://github.com/breedloj/language-servers/commit/59cf15385c320e6644b04548e1eb61a68ca784de))
* added support for injecting additional context commands ([#1045](https://github.com/breedloj/language-servers/issues/1045)) ([d755da3](https://github.com/breedloj/language-servers/commit/d755da36bd7bf76684aceafb6a2cbc2f8f76291e))
* **amazonq:** add pair programming toggle ([#1013](https://github.com/breedloj/language-servers/issues/1013)) ([7266d32](https://github.com/breedloj/language-servers/commit/7266d32b2fb73ead40abecb22749a2c9e5206a2a))
* **amazonq:** initial implementation of read/list chat result ([#1024](https://github.com/breedloj/language-servers/issues/1024)) ([890e45e](https://github.com/breedloj/language-servers/commit/890e45eae48930370089936880c77b10edb83059))
* **amazonq:** initial UI for execute bash chat message ([#1041](https://github.com/breedloj/language-servers/issues/1041)) ([b3ed518](https://github.com/breedloj/language-servers/commit/b3ed518f27251742c392138f05b02281dfcddcac))
* **chat-client:** added support for redirecting message handling to custom adapter ([#905](https://github.com/breedloj/language-servers/issues/905)) ([b95fe1e](https://github.com/breedloj/language-servers/commit/b95fe1e1a63f6df469bcd0c5e58a66c0819feb55))
* **chat-client:** handle chat updates for existing messages ([#1048](https://github.com/breedloj/language-servers/issues/1048)) ([74abb12](https://github.com/breedloj/language-servers/commit/74abb126a736e3c37beb492bc7405b02c953296c))
* **chat-client:** history list and conversation actions ([#929](https://github.com/breedloj/language-servers/issues/929)) ([5b8e83c](https://github.com/breedloj/language-servers/commit/5b8e83cacc56d854623a6e2b59f2f920538f5b85))
* **chat-client:** implement export conversation flow ([#944](https://github.com/breedloj/language-servers/issues/944)) ([63fd2dc](https://github.com/breedloj/language-servers/commit/63fd2dc773e742c47040fd66aac4912664d91dd0))
* configure history button based on history enabled/disabled ([#957](https://github.com/breedloj/language-servers/issues/957)) ([eded88f](https://github.com/breedloj/language-servers/commit/eded88fae2311c2a73d377a479933f9f66df137d))
* context data selection support in chat-client ([#902](https://github.com/breedloj/language-servers/issues/902)) ([a22dea5](https://github.com/breedloj/language-servers/commit/a22dea51c0039f198a403e88f774ad7769b15d29))
* handle fileClick events ([#919](https://github.com/breedloj/language-servers/issues/919)) ([511be2e](https://github.com/breedloj/language-servers/commit/511be2e2e6f527039a99f53cb76fbfc180ef9b55))
* implement restore tab ([#933](https://github.com/breedloj/language-servers/issues/933)) ([ad2c5d7](https://github.com/breedloj/language-servers/commit/ad2c5d77e497e9f8a2019eb547b164f5c5992160))
* initial fsWrite chat message ([#1026](https://github.com/breedloj/language-servers/issues/1026)) ([3fc6e85](https://github.com/breedloj/language-servers/commit/3fc6e85e14614a86982b9fb85317c923784a05af))
* render additional chat messages ([#1025](https://github.com/breedloj/language-servers/issues/1025)) ([3a87baa](https://github.com/breedloj/language-servers/commit/3a87baa96cacba40f3fa920e4a02d26aa01a7058))
* route button event through chat-client.  ([#1037](https://github.com/breedloj/language-servers/issues/1037)) ([c6bb6c5](https://github.com/breedloj/language-servers/commit/c6bb6c5e81f0c639657e36e1989f6bae3ef47f38))
* support create prompt form in chat-client ([#910](https://github.com/breedloj/language-servers/issues/910)) ([a1f0310](https://github.com/breedloj/language-servers/commit/a1f0310eff33700cff9551c7d3c84356e4246856))
* support view diff for fsWrite ([#1042](https://github.com/breedloj/language-servers/issues/1042)) ([98291cb](https://github.com/breedloj/language-servers/commit/98291cb62a43176ec176bcdd92aa7746d08b9740))


### Bug Fixes

* **amazonq:** bundle dependencies ([4a128e7](https://github.com/breedloj/language-servers/commit/4a128e78b275d13af13e9c9f059da01b892fb017))
* **amazonq:** hide stop generating button in hybrid chat ([#1006](https://github.com/breedloj/language-servers/issues/1006)) ([c2b7c25](https://github.com/breedloj/language-servers/commit/c2b7c2549ead850a7c568a64830b2f151bee005a))
* **amazonq:** include mynah ui ([b1dae1b](https://github.com/breedloj/language-servers/commit/b1dae1b85e58dcedc7f102d2643f345c6cade135))
* **amazonq:** reference local path ([a43366d](https://github.com/breedloj/language-servers/commit/a43366d62df5bf9c173f633c08b666d9492ea19d))
* **chat-client:** disable click event for empty history list item ([#973](https://github.com/breedloj/language-servers/issues/973)) ([bc20a04](https://github.com/breedloj/language-servers/commit/bc20a04277a7b603e0d0c5e623c87b2a5c4dc4d4))
* **chat-client:** do not route onTabBarButtonClick to custom handler ([08a5a5b](https://github.com/breedloj/language-servers/commit/08a5a5b76432aa370ef2ae3fc2ac70f922458c36))
* **chat-client:** missing break in getSerializedChat request handling ([#978](https://github.com/breedloj/language-servers/issues/978)) ([5555d09](https://github.com/breedloj/language-servers/commit/5555d09f2c024621ae706e01a8cac70f5582a7d8))
* export for answer-stream card item ([#1019](https://github.com/breedloj/language-servers/issues/1019)) ([c367ef3](https://github.com/breedloj/language-servers/commit/c367ef3a1374032dace0e6755eaa43a1fae6e3c4))
* improve chat rendering if there are additional chat messages ([#1039](https://github.com/breedloj/language-servers/issues/1039)) ([70a086a](https://github.com/breedloj/language-servers/commit/70a086a823fc56dcd068dee0fa3147cb06684b9a))
* incorrect props for fsWrite message ([#1043](https://github.com/breedloj/language-servers/issues/1043)) ([03deddf](https://github.com/breedloj/language-servers/commit/03deddf0f756629e7459a71236e408c0ef3e9727))
* pin typescript version and fix compile errors ([#924](https://github.com/breedloj/language-servers/issues/924)) ([7400fa3](https://github.com/breedloj/language-servers/commit/7400fa3d143fb2c22575485eec7aeb75a63b3612))
* remove duplicate property ([#928](https://github.com/breedloj/language-servers/issues/928)) ([c1aaec0](https://github.com/breedloj/language-servers/commit/c1aaec06b70f4ef9d5e2a7ad0d1cc4d5d6955087))
* remove examples from welcome message ([#1040](https://github.com/breedloj/language-servers/issues/1040)) ([82138b3](https://github.com/breedloj/language-servers/commit/82138b37288ac7dc142b5a9f4ee1e5e70b5ef34a))
* replaced icon for history and added tests ([#951](https://github.com/breedloj/language-servers/issues/951)) ([da3b664](https://github.com/breedloj/language-servers/commit/da3b66414514740f514d96279b826aebc4e86077))
* save ([#1035](https://github.com/breedloj/language-servers/issues/1035)) ([d115563](https://github.com/breedloj/language-servers/commit/d115563b96c41ae571fdf0d0525776ce83de9026))

## [0.1.4](https://github.com/aws/language-servers/compare/chat-client/v0.1.3...chat-client/v0.1.4) (2025-04-08)


### Features

* **chat-client:** added support for redirecting message handling to custom adapter ([#905](https://github.com/aws/language-servers/issues/905)) ([b95fe1e](https://github.com/aws/language-servers/commit/b95fe1e1a63f6df469bcd0c5e58a66c0819feb55))


### Bug Fixes

* pin typescript version and fix compile errors ([#924](https://github.com/aws/language-servers/issues/924)) ([7400fa3](https://github.com/aws/language-servers/commit/7400fa3d143fb2c22575485eec7aeb75a63b3612))

## [0.1.3](https://github.com/aws/language-servers/compare/chat-client/v0.1.2...chat-client/v0.1.3) (2025-04-07)

### Features

- add context transparency feature ([#903](https://github.com/aws/language-servers/issues/903)) ([9432ffb](https://github.com/aws/language-servers/commit/9432ffb8586e4f8181c4f14944b0d3d32aff3e78))
- context data selection support in chat-client ([#902](https://github.com/aws/language-servers/issues/902)) ([a22dea5](https://github.com/aws/language-servers/commit/a22dea51c0039f198a403e88f774ad7769b15d29))
- support create prompt form in chat-client ([#910](https://github.com/aws/language-servers/issues/910)) ([a1f0310](https://github.com/aws/language-servers/commit/a1f0310eff33700cff9551c7d3c84356e4246856))

## [0.1.2](https://github.com/aws/language-servers/compare/chat-client/v0.1.1...chat-client/v0.1.2) (2025-03-18)

### Features

- **chat-client:** handle 'openTab' requests ([#817](https://github.com/aws/language-servers/issues/817)) ([fdd0b87](https://github.com/aws/language-servers/commit/fdd0b87ad2d2c9a540d2594bb9243cad01b5887a))
- **chat-client:** openTab returns error for tab create if tabs limit hit ([#832](https://github.com/aws/language-servers/issues/832)) ([aa85848](https://github.com/aws/language-servers/commit/aa8584815da1ef6298b83c8d1bb2a1011ed66fe5))

### Bug Fixes

- bump mynah-ui version ([#843](https://github.com/aws/language-servers/issues/843)) ([4b4de1e](https://github.com/aws/language-servers/commit/4b4de1e01143521e5f497ae5780551dd60e0a4fd))

## [0.1.1](https://github.com/aws/language-servers/compare/chat-client/v0.1.0...chat-client/v0.1.1) (2025-02-20)

### Changed

- update mynah-ui to v4.22.1 ([#794](https://github.com/aws/language-servers/issues/794)) ([5630ed3](https://github.com/aws/language-servers/commit/5630ed33005291194e2f9391ec20647b37fa4626))

## [0.1.0](https://github.com/aws/language-servers/compare/chat-client/v0.0.9...chat-client/v0.1.0) (2025-01-08)

### ⚠ BREAKING CHANGES

- **chat-client:** trigger release of new major version ([#713](https://github.com/aws/language-servers/issues/713))

### Added

- Add new `DISCLAIMER_ACKNOWLEDGED` event to the chat client
- Add new `disclaimerAcknowledged?: boolean` flag to the config
- Add an acknowledgeable legal disclaimer to every tab based on the `disclaimerAcknowledged` flag

### Changed

- Update `@aws/chat-client-ui-types` to 0.1.0
- Update `@aws/language-server-runtimes-types` to 0.1.0
- Shortened legal text in the footer

## [0.0.9] - 2024-11-20

### Changed

- Updated dependency: `@aws/mynah-ui` from 4.16.0 to 4.18.1.

## [0.0.8] - 2024-11-13

### Changed

- Reverted dependency: `@aws/mynah-ui` from 4.18.0 to 4.16.0.

## [0.0.7] - 2024-11-08

### Added

- Add new `COPY_TO_CLIPBOARD` event to the chat client

### Changed

- Changed legal text in the footer
- Update `@aws/chat-client-ui-types` to 0.0.8
- Update `@aws/language-server-runtimes-types` to to 0.0.7
- Upgraded dependency: `@aws/mynah-ui` from 4.15.11 to 4.18.0:
    - Inline code elements now wrap onto new lines
    - Send button no longer shifts out of the window when horizontally filling the prompt input without spaces (now it wraps)
    - Footer text now wraps instead of overflowing when it's too large for the chat window
    - Centered the text in the footer
    - Character counter now only shows starting from a threshold
    - Code blocks now wrap instead of scroll on screens narrower than 300px
    - Added gradient border on prompt input focus
    - Fixed issue where unexpected anchor tags were being generated inside code blocks if there was a link inside the code block
    - Updated link (anchor) colors inside card body to improve visibility on several themes
    - Scrollbar styling, now more subtle on darker themes
    - Fixed `<span>` tags not being closed in (inline) code blocks
    - Fixed file tree item's action icons shrinking when title is too long

## [0.0.6] - 2024-10-10

### Fixed

- Export built chat client app in `./build` directory

## [0.0.4] - 2024-10-09

### Fixed

- Better handle `undefined` quickActionCommands
- Handle application focus through mynah-ui instead of through the window object

### Changed

- Upgraded dependency: `@aws/mynah-ui` 4.15.11
