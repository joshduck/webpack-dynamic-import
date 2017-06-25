import fs from "fs";

export default class ManifestInspector {
  constructor(path) {
    const manifest = JSON.parse(fs.readFileSync(path));
    this.map = [];
    Object.keys(manifest).forEach(bundle => {
      manifest[bundle].map(module => {
        this.map[module.webpackId] = {
          bundle,
          name: module.name
        };
      });
    });
  }

  getBundleForWebpackId(webpackId) {
    const info = this.map[webpackId];
    return info && info.bundle;
  }
}
