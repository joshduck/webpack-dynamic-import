// @flow
import { inspect } from "import-inspector";
import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import ManifestInspector from "../tools/manifest-inspector";
import App from "./app";

const manifest = new ManifestInspector("build/manifest.json");

// Look up bundles for dynamic imports
inspect(data => {
  const bundle = manifest.getBundleForWebpackId(data.webpackRequireWeakId());
  console.log(
    `Did dynamic require for ${data.importedModulePath}, provided by ${bundle}.`
  );
});

const app = express();

app.get("/", function(req, res) {
  res.send(renderToString(<App />));
});

app.listen(3000, function() {
  console.log("Example app listening on http://localhost:3000/");
});
