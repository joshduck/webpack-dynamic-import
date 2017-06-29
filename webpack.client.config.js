const ManifestPlugin = require("webpack-module-manifest-plugin");

module.exports = {
  entry: "./src/client.js",
  target: "web",
  output: {
    path: __dirname + "/../build/client",
    filename: "index.js",
    publicPath: "assets/"
  },
  plugins: [
    new ManifestPlugin({
      filename: "./build/client.manifest.json"
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
