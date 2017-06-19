// @flow
import { inspect } from "import-inspector";
import path from "path";

const stopInspecting = inspect(metadata => {
  console.log("Imported", metadata.serverSideRequirePath);
});

import("./a").then(({ default: a }) => {
  a();
});

import("./b").then(({ default: b }) => {
  b();
});

import("./path/d").then(({ default: b }) => {
  b();
});

import c from "./c";
c();

import d from "./path/d";
d();

setTimeout(stopInspecting);
