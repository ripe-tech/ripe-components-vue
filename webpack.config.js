const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const config = require("uxf-webpack/config/webpack.config.full");

console.log(config);

const info = require("./package.json");

const banner = [
    "ripe-components-vue v" + info.version,
    "(c) 2010-" + new Date().getFullYear() + " " + info.author,
    info.homepage
].join("\n");

config.entry = "./index.js";
config.output.path = path.join(__dirname, "dist");
config.output.filename = "ripe-components-vue.min.js?[hash]";
config.output.library = "RipeComponentsVue";
config.output.publicPath = "/";

config.externals = [nodeExternals(), "vue"]

config.plugins.push(new webpack.BannerPlugin(banner));

config.module.rules = config.module.rules.filter(rule => rule.loader !== "file-loader");
config.module.rules.push({
    test: /\.(png|jpg|gif|svg|ico)$/,
    loader: "url-loader",
    options: {
        esModule: false
    }
});

module.exports = config;
