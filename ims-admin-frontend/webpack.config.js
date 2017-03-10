const webpack = require("webpack");

const sharedConfig = require("./webpack.shared");

module.exports = Object.assign({}, sharedConfig, {
    entry: {
        app: "./src/index.jsx",
        vendor: "./src/vendor.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:3003"
            }
        }
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor"]
        }),
        ...sharedConfig.plugins
    ]
});