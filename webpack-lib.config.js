const path = require("path");

module.exports = {
    entry: "./js/index.js",
    output: {
        filename: "ripe-components-vue-lib.min.js?[hash]",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "umd"
    }
};
