# Rollup Native Modules Boilerplate

A demo app showcasing the use of real JavaScript modules in production&mdash;complete with cross-browser fallbacks for legacy browsers.

The techniques used in this demo are described in the article [Using Native JavaScript Modules in Production Today](https://philipwalton.com/articles/using-native-javascript-modules-in-production-today/).

🚀&nbsp;&nbsp;**[View the demo on Glitch](https://rollup-native-modules-boilerplate.glitch.me/)**&nbsp;&nbsp;👉

## Features

To show that this technique can work for most types of applications, this demo is a React app and includes advanced features like:

* Babel transforms (including JSX)
* CommonJS dependencies (e.g. `react`, `react-dom`)
* CSS dependencies
* Asset hashing
* Code splitting
* Dynamic import (w/ polyfill fallback)
* module/nomodule fallback

To see how all these features are configured, view the Rollup config file ([`rollup.config.js`](/rollup.config.js)). To see the generated output, view the `public` directory after building the app (see below).

## Building and running the app locally

To run the app locally, [clone](https://help.github.com/en/articles/cloning-a-repository) this repo and `npm install` all dependencies, then run the following command:

```sh
npm start
```

This will start a local server at `http://localhost:8080`, where you can view the app.

If you want to run the app _and_ have Rollup monitor the code for changes (and rebundle), you can run:

```sh
npm run watch
```

To build the app without starting the development server, run:

```sh
npm run build
```

### `development` vs `production` mode

By default the app is started in development mode, which means the bundle output is unminified, and a `nomodule` bundle is not generated. You can change this by prefixing any of the above commands with `NODE_ENV=production`, for example:

```sh
NODE_ENV=production npm start
```



