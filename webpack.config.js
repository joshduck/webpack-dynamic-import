const ManifestPlugin = require("./tools/webpack-manifest-plugin");

module.exports = {
  entry: "./src/index.js",
  target: "node",
  output: {
    path: __dirname + "/build",
    filename: "bundle.js"
  },
  plugins: [
    new ManifestPlugin({
      path: "./build/manifest.json"
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
