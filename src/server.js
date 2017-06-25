import { inspect } from "import-inspector";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import ManifestInspector from "../webpack/manifest-inspector";
import App from "./app";

const manifest = new ManifestInspector(
  "build/client.manifest.json",
  "build/server.manifest.json"
);

const app = express();

app.use("/assets", express.static("build/client"));

app.get("/", function(req, res) {
  const bundles = [];

  // Note -- this only fires on first import, so only works for first page load
  const stopInspect = inspect(data => {
    const bundle = manifest.getBundle(data.webpackRequireWeakId());
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
