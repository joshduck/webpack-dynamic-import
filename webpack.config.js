const ManifestPlugin = require("./tools/webpack-manifest-plugin");

module.exports = {
  entry: "./src/server.js",
  target: "node",
  output: {
    path: __dirname + "/build/server",
    filename: "index.js"
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
