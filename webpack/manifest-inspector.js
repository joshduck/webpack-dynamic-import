import fs from "fs";

export default class ManifestInspector {
  constructor(clientPath, serverPath) {
    const clientManifest = JSON.parse(fs.readFileSync(clientPath));
    const serverManifest = JSON.parse(fs.readFileSync(serverPath));

    // Map source name to client bundle.
    const nameToClientBundleMap = {};
    Object.keys(clientManifest).forEach(bundle => {
      clientManifest[bundle].map(module => {
        nameToClientBundleMap[module.name] = bundle;
      });
    });

    // Map client webpack ID to bundle information
    this.serverMap = [];
    Object.keys(serverManifest).forEach(bundle => {
      serverManifest[bundle].map(module => {
        this.serverMap[module.webpackId] = {
          serverBundle: bundle,
          clientBundle: nameToClientBundleMap[module.name],
          name: module.name
        };
      });
    });
  }

  getBundle(webpackId) {
    const info = this.serverMap[webpackId];
    console.log(info);
    return info && info.clientBundle;
  }
}
