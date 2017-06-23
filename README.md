# Webpack Dynamic Import Manifest

Generate a manifest of module bundles at build time, and then determine exactly
which bundles were used.

## Why is this important?

Dynamic imports allow us to split our application up into smaller chunks so that
we spend less time loading and preparing JavaScript in the browser. But because
bundles are loaded only when used, we may end up waiting for critical
functionality to appear when the page is loaded.

This approach means it will be possible to create an isomorphic application
that, after server rendering, will know exactly which component bundles will
be required by the client on initial render. We can then preload those bundles
or even push them via HTTP2.

![Build and run](/docs/screenshot.png?raw=true)
