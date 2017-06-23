var path = require("path");
var fs = require("fs");

function ManifestPlugin(opts) {
  this.opts = opts;
}

ManifestPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", (compilation, callback) => {
    const manifest = {};
    compilation.chunks.forEach(chunk => {
      if (chunk.modules && chunk.files.length) {
        const file = chunk.files[0];

        manifest[file] = chunk.modules
          .filter(module => module.libIdent)
          .map(module => ({
            name: module.libIdent({
              context: this.opts.context || compiler.options.context
            }),
            index: module.index,
            index2: module.index2,
            webpackId: module.id // Corresponds to require.resolveWeak / webpackRequireWeakId
          }));
      }
    });

    var json = JSON.stringify(manifest, null, 2);
    fs.writeFileSync(this.opts.path, json);

    callback();
  });
};

module.exports = ManifestPlugin;
