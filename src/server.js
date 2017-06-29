import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { inspect } from "import-inspector";
import manifestInspector from "module-manifest-inspector";
import fs from "fs";

import App from "./components/app";

// Load manigests generated at build time.
const manifest = manifestInspector.multi(
  JSON.parse(fs.readFileSync("build/client.manifest.json")),
  JSON.parse(fs.readFileSync("build/server.manifest.json"))
);

const app = express();

app.use("/assets", express.static("build/client"));

app.get("/", function(req, res) {
  const bundles = [];

  // When a module is dynamically imported (via react-loadable or import())
  // import-inspector will fire the inspector below. Note -- this only fires on
  // first import, so preloading only works for first page load
  const stopInspect = inspect(data => {
    const id = data.webpackRequireWeakId();
    const bundle = manifest.getClientBundleForServerId(id);
    console.log(`Import ${data.importedModulePath} is provided by ${bundle}.`);
    bundle && bundles.push(bundle);
  });

  const app = renderToString(<App />);

  stopInspect();

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Dynamic Imports</title>
      </head>
      <body>
        <div id="root">${app}</div>
        <script src="/assets/index.js"></script>
        ${bundles
          .map(bundle => `<script src="/assets/${bundle}"></script>`)
          .join("")}
      </body>
    </html>
  `);
});

app.listen(3000, function() {
  console.log("Example app listening on http://localhost:3000/");
});
