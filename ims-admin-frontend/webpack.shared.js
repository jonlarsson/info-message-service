const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    output: {
        filename: "[name].bundle.min.js",
        path: path.join(__dirname, "dist")
    },

    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".jsx"]
    },

    module: {
        loaders: [
            {test: /\.(js|jsx)?$/, exclude: /node_modules/,loader: "babel-loader"},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"},
            {test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?.*$|$)/, loader: "file-loader"}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Skrivning.se - Elev',
            template: "./src/index-template.ejs"
        })
    ]
};