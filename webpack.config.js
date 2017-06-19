const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: './build'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
