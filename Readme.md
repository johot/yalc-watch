# Yalc-watch

## Why

[Yalc](https://github.com/whitecolor/yalc) is an awesome tool for developing and testing your packages / libraries locally without publishing to npm.

The only thing yalc is currently missing is a way of watching the build output of a library and automatically pushing that build into the projects you want to test it with.

This can be really helpful when building something like a design system or component library where you wan't instant feedback in a consuming app.

## What

This very simple package will allow you to monitor an output folder (using [nodemon](https://github.com/remy/nodemon) under the hood) and will automatically call `yalc push` when a change is detected.

This will automaticaly update all projects where you have installed your package locally using the `yalc add your-package-name` command.

> For projects such as [next.js](https://nextjs.org/) or [create-react-app](https://github.com/facebook/create-react-app) this will automatically trigger a live reload of your project.

## How

In the library / package install `yalc-watch` as a dev dependency:

```
npm i yalc-watch --save-dev
```

Add the following confic JSON to your `package.json` and tweak to your liking:

```json
...
"yalcWatch": {
  "watchFolder": "dist",
  "buildWatchCommand": "tsc --watch",
  "extensions": "js,png,svg,gif,jpeg,css",
}
...
```

Still in your `package.json` add the following to the `scripts` section:

```json
"scripts": {
  ...
  "yalc-watch": "yalc-watch",
  ...
```

Now simply run the command:

```
npm run yalc-watch
```

`yalc-watch` will start running the configured `buildWatchCommand` and look for changes in your configured `watchFolder`. When a change is detected the `yalc push` command will be executed updating all projects that added your package using `yalc add your-package-name`.
