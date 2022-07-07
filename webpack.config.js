const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "/JSON.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "JSON.js"
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    devServer: {
        static: path.join(__dirname, "dev"),
        port: 3000,
        hot: true
    },
    mode: "development",
    devtool: "source-map"
};
