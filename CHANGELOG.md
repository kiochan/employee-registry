# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0](https://github.com/kiochan/employee-registry/compare/v0.1.0...v0.2.0) (2022-11-16)


### Features

* 🎸 impl bundle 2 ([282e915](https://github.com/kiochan/employee-registry/commit/282e915ec38532c7ae7e34f9a6e302adbac8b58e))

## 0.1.0 (2022-11-15)

### ⚠ BREAKING CHANGES

- 🧨 field name changes
- 🧨 lowdb support deprecated

### Features

- 🎸 a fail response should not return 200 ([deb303a](https://github.com/kiochan/employee-registry/commit/deb303ab7417b99dc313e677fb7e4bae4b5aa44c))
- 🎸 add basic http response status code ([945c0f8](https://github.com/kiochan/employee-registry/commit/945c0f867abc1b99b81d273063316788fd402436))
- 🎸 add basic implementation for token api ([78fa137](https://github.com/kiochan/employee-registry/commit/78fa137ae0bc3b07755b7326416f7a561c7fb5be))
- 🎸 add const for fails during login ([44f3540](https://github.com/kiochan/employee-registry/commit/44f3540135447cf8c288a1e379daec40562e4074))
- 🎸 add eployees page ([bee6ae6](https://github.com/kiochan/employee-registry/commit/bee6ae64b5cecbee512eef5e028bc8b5ef4b2357))
- 🎸 add forbidden 403 ([f99a715](https://github.com/kiochan/employee-registry/commit/f99a7157d2b4ec59253fe094b979b64632f864f5))
- 🎸 add helper for password hashing ([7d0edac](https://github.com/kiochan/employee-registry/commit/7d0edac0804e77e226166f9e176e64cf1ee7787d))
- 🎸 add new const for 500 errors ([0c1147c](https://github.com/kiochan/employee-registry/commit/0c1147cf56a77c4365d438398b8780ba3b929a2c))
- 🎸 add password field for document employee ([a08d06b](https://github.com/kiochan/employee-registry/commit/a08d06bc9f31fe26911f9b2b622f1e9c2f8aebe8))
- 🎸 add status 'fail' to common response base ([5f5e7cc](https://github.com/kiochan/employee-registry/commit/5f5e7cc40dd7cb9c126f86b6f2c614ce5a194520))
- 🎸 add text ([c2cf5c3](https://github.com/kiochan/employee-registry/commit/c2cf5c33722332b0f636115fbab41198588ab85a))
- 🎸 add type for basic response ([00185f3](https://github.com/kiochan/employee-registry/commit/00185f3149ab744f48686b3d82e8e3b53948190e))
- 🎸 add typing for token api ([c1602ba](https://github.com/kiochan/employee-registry/commit/c1602baa34a2a29fc14741edee3a57652d8b65fc))
- 🎸 add whois api for check current userinfo quickly ([c67d9de](https://github.com/kiochan/employee-registry/commit/c67d9de4bdd31aa9ef2fa4bc0550b23bd7739fb8))
- 🎸 change field data to expired ([a1f3c2a](https://github.com/kiochan/employee-registry/commit/a1f3c2ab32f1d12b04ae2b713938cfa3c37b4008))
- 🎸 create basic adapter for db ([741f0bc](https://github.com/kiochan/employee-registry/commit/741f0bcd2138c9a0773fe2036904e87312d34ddf))
- 🎸 create standard error message ([f162df9](https://github.com/kiochan/employee-registry/commit/f162df9fe33506a617b70edad08059774c3d779b))
- 🎸 create user is now nor require a token ([db03510](https://github.com/kiochan/employee-registry/commit/db0351081ca31d020db2d0fe8859bcdaa83ac9b6))
- 🎸 date field shows when it will expired ([47dc7f3](https://github.com/kiochan/employee-registry/commit/47dc7f3af69af6e58349ff64422392a46c09fb59))
- 🎸 disallow user to login if they didn't set a password ([07a5b51](https://github.com/kiochan/employee-registry/commit/07a5b51791a9cb5047dea67812578b5beb05d316))
- 🎸 expent typings ([bfdebad](https://github.com/kiochan/employee-registry/commit/bfdebad3b2da142057c33835258a70a54a9e2c01))
- 🎸 finish bundle 1 ([8e19d11](https://github.com/kiochan/employee-registry/commit/8e19d1150a660e3014909edd9ff4d9babfcfb68d))
- 🎸 impl for bundle 1 ([61f8dea](https://github.com/kiochan/employee-registry/commit/61f8deadd61ceeff6a8f8a40f58d62348f5bc34e))
- 🎸 implement backend of bundle 1 ([b07e93c](https://github.com/kiochan/employee-registry/commit/b07e93c87e798397c7710140241389582b9502f1))
- 🎸 implement of token api ([251dacd](https://github.com/kiochan/employee-registry/commit/251dacda6a7ff44c170d13c294ac7126e57cda7b))
- 🎸 password as optional ([6cf9721](https://github.com/kiochan/employee-registry/commit/6cf972153d36f3651460cf56c88220e1b2fc853d))
- 🎸 show login button if user is not login ([ac5dee1](https://github.com/kiochan/employee-registry/commit/ac5dee161fbc9cc12144d7179be1ebecd2af4af0))
- 🎸 use /details for display user info ([f5b7e8d](https://github.com/kiochan/employee-registry/commit/f5b7e8d57fba4aaa9d35dbddc4e999e28a967056))
- 🎸 use mongoose to control databese ([0f1dfb8](https://github.com/kiochan/employee-registry/commit/0f1dfb8c5c6bfd8dcd93605020ce4745b542a7f0))

### Bug Fixes

- 🐛 add resolver into deps for typescript ([3e52084](https://github.com/kiochan/employee-registry/commit/3e520845d357b9351de1c1626341a3206744bcbd))
- 🐛 avoid multi <a /> components ([a566abf](https://github.com/kiochan/employee-registry/commit/a566abf1e48bc71cfc6cc7f1abd2bd5b1a4af439))
- 🐛 avoid to return a error page ([927391d](https://github.com/kiochan/employee-registry/commit/927391d0f66889cf82f9ec6bc185f62b2bacc2e1))
- 🐛 constance should add 'as const' for typing ([dd5783b](https://github.com/kiochan/employee-registry/commit/dd5783b2fabc220ec44ad18bb6bbf3e84dab048f))
- 🐛 correct returns ([08df3ce](https://github.com/kiochan/employee-registry/commit/08df3ce8e3d55989394d83fa10b1f88d4b2e2cb9))
- 🐛 correct typings ([6262a67](https://github.com/kiochan/employee-registry/commit/6262a67f3676d9622dc5d1d43f0ffd5c4e3a45b8))
- 🐛 database names cannot contain the character '/' ([9b954b8](https://github.com/kiochan/employee-registry/commit/9b954b89a36a1960bec1aa980a72605c1b24b56b))
- 🐛 fix false exp in is statement ([2aa5faf](https://github.com/kiochan/employee-registry/commit/2aa5faf9cbe61e896e52514eb0dff12bba37aa40))
- 🐛 fix infinity build ([9cb91b6](https://github.com/kiochan/employee-registry/commit/9cb91b6a7edba29b2108154db9695e24ab05f942))
- 🐛 fix worng interface name ([e5b47ab](https://github.com/kiochan/employee-registry/commit/e5b47ab2336e9d3e8dfdcab8a350a7a38aef3d9b))
- 🐛 if token should be genarated, it is not required ([cbbc173](https://github.com/kiochan/employee-registry/commit/cbbc1731b71bb1fdbb076a85f63bbabfb44a0eb6))
- 🐛 make sure a model only create once ([2744c4a](https://github.com/kiochan/employee-registry/commit/2744c4a238bf3d957afed3de9c4a1794882f05a8))
- 🐛 model should only create once ([14b7f6f](https://github.com/kiochan/employee-registry/commit/14b7f6f9f976beeb8c3f826b32bd027988a409c1))
- 🐛 no need to extend from Document ([522b408](https://github.com/kiochan/employee-registry/commit/522b4083e6177ca42ba8b5be088736efd4527863))
- 🐛 password is required for login ([6085fda](https://github.com/kiochan/employee-registry/commit/6085fda3040846a46f69d95eb0d8052a240fd04c))
- 🐛 prevent to connect multi times ([bdb6148](https://github.com/kiochan/employee-registry/commit/bdb614807c502ac6d12dc16ffd515e399584698e))
- 🐛 remove console.log ([8d5c5df](https://github.com/kiochan/employee-registry/commit/8d5c5dfa666f3cea8ef53ddcb25587663e029146))
- 🐛 remove dotenv ([10fc677](https://github.com/kiochan/employee-registry/commit/10fc6770e161cafaf1cbb4688bc8a493bd89ec47))
- 🐛 success dosen't always need payload ([23fa101](https://github.com/kiochan/employee-registry/commit/23fa101666d55fafbb5a7ca46dffe075dc275105))
- 🐛 swap original password and hashed password ([cf50b38](https://github.com/kiochan/employee-registry/commit/cf50b386c93503af69bdfe12b4bd33dd865ac652))
