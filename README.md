# React Bundle Preloading

This project makes it possible to determine which Webpack bundles should be
preloaded in the client.

We do this by recording which modules were dynamically imported during server
render and using a pre-generated manifest to find the corresponding client
bundles. **This is still a work in progress**

## Why is this important?

Dynamic imports allow us to split our application up into smaller chunks so that
we spend less time loading and preparing JavaScript in the browser. But because
bundles are loaded only when used, we may end up waiting for several round trips
as we load JavaScript, execute some code, and then discover a new dynamic import
that requires even more JavaScript to be loaded.

## Before and after

![Before](/docs/before.png?raw=true)
![After](/docs/after.png?raw=true)

## How this works

* [babel-plugin-syntax-dynamic-import](https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-dynamic-import)
  Allows Babel to compile dynamic imports.
* [babel-plugin-import-inspector](https://github.com/thejameskyle/babel-plugin-import-inspector)
  Informs our code at runtime when a dynamic import occurs.
* [react-loadable](https://github.com/thejameskyle/react-loadable)
  Renders dynamically loaded components, using import-inspector to synchronously
  load dependencies for the server render.
* [webpack-module-manifest-plugin](https://github.com/joshduck/webpack-module-manifest-plugin)
  Emits a list of modules that are packaged in server and client bundles.
* [module-manifest-inspector](https://github.com/joshduck/module-manifest-inspector)
  Looks at the client and server manifest files and determines what client
  bundles will be needed based on the dynamic imports that happen on the server.
