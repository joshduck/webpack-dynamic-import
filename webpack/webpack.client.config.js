const ManifestPlugin = require("./webpack-manifest-plugin");

module.exports = {
  entry: "./src/client.js",
  target: "web",
  output: {
    path: __dirname + "/../build/client",
    filename: "index.js"
  },
  plugins: [
    new ManifestPlugin({
      path: "./build/client.manifest.json"
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
