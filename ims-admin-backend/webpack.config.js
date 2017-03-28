const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    production: "./service-script/src/index.js"
  },

  output: {
    filename: "service-script-template.js",
    path: path.join(__dirname, "generated")
  },

  resolve: {
    extensions: [".js"]
  },

  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader"},
      {test: /\.css$/, loader: "style-loader!css-loader"},
      {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"}
    ]
  }
};