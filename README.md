# Emma Challenge

[![Preview](./data/preview.png)](https://drive.google.com/file/d/1W-DrUplnbCX8PVIumAkX7I7oBPXyMEJE/view)

## Setup

-   Make sure you have [React Native setup](https://reactnative.dev/docs/environment-setup)
-   Install project dependencies

```
    npm i
    npx pod-install
```

## E2E testing

-   Make sure you have [Detox setup](https://github.com/wix/Detox/blob/master/docs/README.md)
-   Make sure you have `iPhone 11 Pro Max` simulator installed

-   Prepare build for test

```

// Debug
npm run e2e:build:ios

// Release
npm run e2e:build-release:ios

```

-   Run tests

```

// Debug
npm run e2e:test:ios

// Release
npm run e2e:test-release:ios

```

## Others commands

-   `npm run check:ts` - typescript validation
-   `npm run lint` - linting
-   `npm run utils:prepareContactsData` - grabbing `data/avatars` folder, preparing filenames, moving avatars to project, and generating `assets/contacts.ts` data file.

## Missing pieces due to the time limit

-   Using just border without animation for horizontal list instead of shadow
-   Horizontal layout not handled (vertical orientation enabled only)

## Components

-   [LinkedSnapLists](./src/components/LinkedSnapLists/README.md)

The solution based on [react-native-reanimated v2](https://docs.swmansion.com/react-native-reanimated/), which is still in alpha version and would not be sutable for all apps because it requires [`TurboModules`](https://github.com/react-native-community/discussions-and-proposals/issues/40) and `Hermes` enabled.

But the architecture of the new version allowing us (using `TurboModules`) to call native methods (such as `scrollTo` on `ScrollView`) without crossing the bridge, which gives a great performance boost and perfectly matched the needs for this task.

## Libraries and tools highlights

-   `typescript`
-   `react-native-reanimated (v2)`
-   `@react-navigation` - used as main navigation library, nice choose between flexibility and performance.
-   `styled-components` - the main tool for styles.
-   `prettier`, `husky`, `lint-staged` - pre-commit linting, validation and formatting.
-   `detox` - e2e testing
