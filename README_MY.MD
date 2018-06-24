This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Table of Contents

- [Purpose](#purpose)
* [Available Scripts](#available-scripts)
  * [Builtin create-react-native-app scripts](#builtin-scripts)
  * [Additional npm scripts](#additional-npm-scripts)
    * [npm run jest](#npm-run-jest)
    * [npm run test](#npm-run-test)
    * [npm run test:watch](#npm-run-test:watch)
    * [npm run flow](#npm-run-flow)
    * [npm run flow-coverage](#npm-run-flow-coverage)
    * [npm run prettier](#npm-run-prettier)
    * [npm run format](#npm-run-format)
    * [npm run precommit](#npm-run-precommit)
    * [npm run lint](#npm-run-lint)
    * [npm run lint:fix](#npm-run-lint:fix)
    * [npm run check-health](#npm-run-check-health)

## Purpose

This project suites as a boilerplate configuration for React Native project. It is a basic React Native Redux application with bunch of useful npm scripts and examples of unit/integration tests.

## Available Scripts

#### Builtin scripts

App uses [Create React Native App](https://github.com/react-community/create-react-native-app) so by default following npm commands are available:

- `npm start`
- `npm test`
- `npm run ios`
- `npm run android`
- `npm run eject`

  Refer to the [official guide](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md) for more details regarding [Create React Native App](https://github.com/react-community/create-react-native-app) workflow and capabilities.

### Additional npm scripts

#### `npm run jest`
Executes [jest](https://github.com/facebook/jest) with `jest.config.js` configuration.

#### `npm run test`
Executes [jest](https://github.com/facebook/jest) and generates test coverage report

#### `npm run test:watch`
Executes [jest](https://github.com/facebook/jest) in [watch](https://facebook.github.io/jest/docs/en/cli#watch) mode

#### `npm run flow`
Executes [flow](https://github.com/facebook/flow) type checker

#### `npm run flow-coverage`
Generates [flow-coverage](https://github.com/rpl/flow-coverage-report) report

#### `npm run prettier`
Executes [prettier](https://github.com/prettier/prettier)

#### `npm run format`
Executes [eslint](https://github.com/eslint/eslint) (in `--fix` mode) and [prettier](https://github.com/prettier/prettier)

#### `npm run precommit`
This script registers `precommit` hook, that executes `prettier` before every commit - no need to call it directly

#### `npm run lint`
Executes [eslint](https://github.com/eslint/eslint)

#### `npm run lint:fix`
Executes [eslint](https://github.com/eslint/eslint) in [--fix](https://eslint.org/docs/user-guide/command-line-interface#--fix) mode

#### `npm run check-health`
Executes all available scripts, that commit to code quality:
- `lint`
- `flow`
- `test`
- `format`
- `flow-coverage`

That script could be executed in CI as part of build.
