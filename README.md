# Webpack Dynamic Import Manifest

Generate a manifest of module bundles at build time, and then determine exactly
which bundles were used to server render a page.

** NOTE: This is still a work in progress **

## Why is this important?

Dynamic imports allow us to split our application up into smaller chunks so that
we spend less time loading and preparing JavaScript in the browser. But because
bundles are loaded only when used, we may end up waiting for critical
functionality to appear when the page is loaded.

This approach means it will be possible to create an isomorphic application
that, after server rendering, will know exactly which component bundles will
be required by the client on initial render. We can then preload those bundles
or even push them via HTTP2.

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
