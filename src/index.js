// @flow
import { inspect } from "import-inspector";
import path from "path";
import process from "process";
import ManifestInspector from "../tools/manifest-inspector";

const manifest = new ManifestInspector("build/manifest.json");

// Hard require on component
import a from "./components/a";
a();

// Look up bundle for a module without importing it
const bundle = manifest.getBundleForWebpackId(
  require.resolveWeak("./components/b")
);
console.log(`Did weak resolve for ./components/b, provided by ${bundle}`);

// Look up bundles for dynamic imports
inspect(data => {
  const bundle = manifest.getBundleForWebpackId(data.webpackRequireWeakId());
  console.log(
    `Did dynamic require for ${data.importedModulePath}, provided by ${bundle}.`
  );
});

import("./components/b").then(({ default: b }) => {
  b();
});

import("./components/c").then(({ default: c }) => {
  c();
});
