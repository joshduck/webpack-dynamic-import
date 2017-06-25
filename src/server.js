import { inspect } from "import-inspector";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import ManifestInspector from "../webpack/manifest-inspector";
import App from "./app";

const manifest = new ManifestInspector("build/server.manifest.json");

// Look up bundles for dynamic imports
inspect(data => {
  const bundle = manifest.getBundleForWebpackId(data.webpackRequireWeakId());
  console.log(
    `Did dynamic require for ${data.importedModulePath}, provided by ${bundle}.`
  );
});

const app = express();

app.get("/", function(req, res) {
  const app = renderToString(<App />);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Dynamic Imports</title>
        <script src="https://unpkg.com/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
      </head>
      <body>
        <div id="root">${app}</div>
      </body>
    </html>
  `);
});

app.listen(3000, function() {
  console.log("Example app listening on http://localhost:3000/");
});
