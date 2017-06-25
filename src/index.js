// @flow
import { inspect } from "import-inspector";
import React from "react";
import { renderToString } from "react-dom/server";
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

console.log(renderToString(<App />));
