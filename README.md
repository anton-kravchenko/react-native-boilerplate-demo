This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Table of Contents

- [Purpose](#purpose)

* [Available Scripts](#available-scripts)
  - [Builtin create-react-native-app scripts](#builtin-scripts)
  - [Additional npm scripts](#additional-npm-scripts)
    - [npm run jest](#npm-run-jest)
    - [npm run test](#npm-run-test)
    - [npm run test:watch](#npm-run-test:watch)
    - [npm run flow](#npm-run-flow)
    - [npm run flow-coverage](#npm-run-flow-coverage)
    - [npm run prettier](#npm-run-prettier)
    - [npm run format](#npm-run-format)
    - [npm run precommit](#npm-run-precommit)
    - [npm run lint](#npm-run-lint)
    - [npm run lint:fix](#npm-run-lint:fix)
    - [npm run check-health](#npm-run-check-health)
* [Motivation](#motivation)
  - [Automated testing](#automated-testing)
  - [Code style](#code-style)
  - [Linting](#linting)
  - [Static type checker](#static-type-checker)
  - [Continuous integration](#continuous-integration)
* [Issues](#issues)
  - [Linter config](#linter-config)
  - [Flow usage](#flow-usage)
  - [Crash on Android](#crash-on-android)

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

### Motivation

This topic briefly describes motivation behind configuration described above

## Automated testing

1.1 Motivation
Automated testing has its proven ability of eliminating significant amount of bugs before "production", simplified regression testing, pointing to bugs caused by massive refactorings. It is a crucial part of success of any big JavaScript project, since JavaScript is extremely dynamic language, known for its weird aspects like: implicit types coercion, extremely complex and absolutely not obvious semantics of all arithmetic operations, indirect support of OOP, "resistance" to lots of errors (this behavior sometimes results in absolutely unpredictable application flow). It is absolutely must-have practice to have good test (automated) coverage for big JavaScript projects.

1.2 Benefits of automated testing
In addition to items described above, automated testing is also beneficial for a development process itself.
Automated tests:

- (especially unit tests) may suite as some kind of code documentation (which never gets outdated).
- enable fast "feedback loop" - if some breaking changes were introduced during development of new feature/bug fix/refactoring - failing test will point to problematic part of the code right away
- eliminates necessity of manual verifying all application functionality to make sure that no breaking changes were introduced during development (in JavaScript applications it is important, because there are no static validation/verification/compilation step - code may fail only in runtime)
- it is a known fact, that developers with "automated testing mindset" produce better code (more concise, state-free (when possible), modular, e.t.c.)
- allows to gain ability to move fast without breaking things

  1.3 Unit testing
  Unit testing is a most well known kind of automated tests. In a ReactNative application, unit tests could be used to cover logic responsible for modifying application global state - to make sure that all transitions from one state to another are well defined and correct. Also unit tests are useful for verifying all business logic of application that doesn't rely on external services.

  1.4 Snapshot/components testing
  Modern test runners (like Jest) provide powerful capabilities for efficient testing of React/ReactNative components. Such tests could help with verifying component - related concerns: "render" logic, proper response to user input, proper translations between internal component state.

  1.5 Graybox End-to-end testing
  There are several known issues with classic blackbox E2E testing approach:

- flakiness - due to nature of truly E2E tests, almost any E2E test may fail any time. That happens due to several reasons:
- E2E tests heavily rely on external services (APIs, databases, authentication services, e.t.c) - any of such services may fail, may break defined contracts, may not respond during reasonable time
- E2E tests doesn't aware about device performance characteristics - same suite of tests may behave differently on different devices
- unreasonably slow tests execution - since blackbox E2E tests have to deal with manual synchronizations (via numerous "sleep" functions), heavy external services, etc
- slow "feedback" loop - in most cases E2E tests are being executed as part of "nightly" build so there is at least 24 hours gap between introducing a bug and finding it.

In a ReactNative application, E2E tests are especially useful, because (in theory) single well-defined suite could test both android and ios applications. Also ReactNative may have issues with support of certain UI components: some ui components may be supported only for IOS or only for Android.

There are at least one tool, which can pinpoint such kind of issues(described above) with ReactNative and provide capabilities for writing functional graybox E2E tests that are free of issues with blackbox E2E tests.
https://hackernoon.com/detox-gray-box-end-to-end-testing-framework-for-mobile-apps-196ccd9564ce

Also such approach for testing application logic in E2E manner could boost developers productivity (because "Detox" tests are relatively fast and can run for each commit and on any machine, which has android and ios simulator).

1.6 Testing tools
There are several testing frameworks available for JavaScript React and ReactNative projects. One of the most powerful ones is Jest. It has several strengths (comparing to another popular test framework - mocha):

- it is open source and baked by Facebook - so it has first class support and capabilities for testing React/ReactNative applications
- it is "all in one" tool. It has
  - rich assertions library
  - built-in "mocking" library
  - built-in support for code coverage
  - tools for testing React/ReactNative applications
- it is very fast:

  - it is able to execute test suites in parallel on each available threads
  - it has smart task planning module - it is smart enough to execute heavy tests before executing smaller one

  1.7 Downsides of automated testing
  There are numerous automated testing techniques/approaches/workflows (several of them are described above). It is important to carefully confider and define available testing approaches and techniques to define configuration ("testing pyramid"), where benefits of testing will outweigh downsides and efforts.

  1.8 Summary
  Good test (automated) coverage is important part of success of any software project. It helps to achieve main business goals - high quality, error free software products. JavaScript has known issues with maintainability so it is absolutely obvious, that with big JavaScript code bases it becomes extremely hard to move fast without breaking existing code.

## Code style

2.1 Motivation
Code style is an important part of any software project. Since "Dany" team will include developers with different technological background (Java, Objective C, JavaScript), it is important to choose unified code style for the whole project. In JavaScript, there are many of style guides, backed by different companies and open source software products. Due to several reasons, JavaScript community did not come up with a unified code style guide / document. Therefore, there are two possible ways to gain consistency in a code base (described in 3.2 and 3.3)

2.2 Implementing own code style document / guide for project
Development of own code style guide / document. One of the possible ways of solving “code style” issue is to develop own code style document. There are several disadvantages of such approach:
Such effort may may take a lot of time from the creators to learn best “code styling” rules and to formalize all of them in a code style document
It may take some time for the developers to learn all those coding style rules
It is relatively hard to manually follow all rules described in code style document

2.3 Automatic code formatters
On the other hand, automatic code formatting tools (such as https://github.com/prettier/prettier), can solve "code style issue" with absolutely no cost. Prettier is a configurable code formatter, that basically reads code and re-formats it in accordance with built-in code style rules. This approach can significantly improve code readability (due to code style consistency) and will not require any specific actions from developers (except initial one-time configuration). Automatic code formatters provide several benefits:
No need to develop own code style document (prettier has built-in code style rules)
No need to learn any code style document (because prettier will take care about code compliance with built-in rules)
No need to manually follow / track styling rules
Prettier is configurable: 2/4 spaces tab size, spaces / tabs, single quotes / double quotes, maximum line length, e.t.c

2.4 Workflow with automatic code formatters
Execution of “prettier" could be triggered by a pre-commit hook (could be registered via npm scripts) or as part of a pre-commit hook in a git repository. Also it can be executed from code editor (for example from VS Code)

## Linting

3.1 Linting overview
Linter is a static code analyzer, that helps to find problematic code patterns and to force specific code style rules.

3.2 Linting motivation
Linter tool (such as [eslint](https://github.com/eslint/eslint)) can enforce following rules (full list of available rules https://eslint.org/docs/rules/):

- functional:
  - no unused variables/function arguments
  - no-var - force to use let/const instead of "var" to avoid "hoisting" behavior
  - disallow with statements
  - no-this-before-super - disallow this/super before calling super() in constructors
  - no-class-assign - disallow reassigning class members
- code style:
  - camelcase - enforce camelcase naming convention
  - coma-spasing - enforce consistent spacing before and after commas
  - block-spasing - enforce spaces inside of blocks after opening block and before closing block
  - prefer-arrow-callback - require using arrow functions for callbacks

It is a common practice to incorporate linting into the compilation process as "health_check" npm script and as pre-commit step in a git repository as additional static verification step. Also usage of ESlint + prettier can force strict and consistent code style across all project. It is very helpful, because there is no need in developing/maintaining own exhaustive "code standard" document.

## Static type checker

JavaScript as a language, wasn't designed to be an effective tool for a development of big software systems (partially described in 1.1). Projects, entirely written in JavaScript, at some point, start to suffer from maintainability issues (result of extremely dynamic nature of the language - there are no way to check code correctness before runtime).

It is one of the reasons why there are so many «compile to js” languages. One of the most successful and popular ones are Flow and Typescript. Both of them are statically typed super sets of JavaScript. Tools like Flow and TypeScript allows to:

- statically verify code "soundness" before runtime (both of the tools have proven ability of finding "problematic" code that may cause runtime exceptions)
- boost development workflow:
- smart autocomplete
- confident refactorings
- explicit contracts of APIs

## Continuous integration

It is a common practice to run all available/implemented verification steps for each single commit in shared branches.
All of the items described above could be used as such static verification steps. To simplify and unify execution of all items described above - separate "check_health" npm script could be created. Such script may include following items:

- execution of Flow type checker (or TypeScript compiler) ( to make verify system "soundness" statically - before runtime)
- execution of unit / integration / E2E tests (execution of Jest in CI mode (in that mode Jest wont create new snapshots) and Detox in headless(in-memory emulator) mode (if possible)
- execution of linter - to make sure, that code base is consistent with best practices (described in item 3)
- execution of prettier - to automatically reformat source files (to automatically enforce consistent code style)
- generating (and deployment if commit is going to be merged to master branch) of static code documentation - described in item 5.1
- build of Android / IOS bundles - to make sure, that no breaking changes were introduced

## Issues

## Linter config

Since project uses React Native, Flow and Prettier, linter config (`.eslintrc.config.js`) may look a bit **overwhelming**. However, it includes configs from `airbnb`, `prettier/flowtype` and `prettier/react`. Also, there are several disables rules:

- `class-methods-use-this`
- `react/destructuring-assignment`
- `react/sort-comp`
- `react/jsx-filename-extension`

## Flow usage

`npm run flow-coverage` (as well as `npm run flow`) script may fail. I'm not sure why, but flow server may not respond to `flow-coverage` requests if it (flow) installed (and executed) globally. To fix this issues run `flow stop` (this command stops `flow server`) and run `npm run flow-coverage` again.

## Crash on Android

App crashes on Android (on second screen) but with IOS (Iphone 8 and Iphone X emulator) everything is fine.
