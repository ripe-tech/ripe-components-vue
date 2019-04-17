const path = require("path");
const webpack = require("webpack");

const config = require("uxf-webpack/config/webpack.config.full");

const info = require("./package.json");

const banner = [
    "ripe-components-vue v" + info.version,
    "(c) " + new Date().getFullYear() + " " + info.author,
    info.homepage
].join("\n");

config.entry = "./index.js";
config.output.path = path.join(__dirname, "dist");
config.output.filename = "ripe-components-vue.min.js?[hash]";
config.output.library = "RipeComponentsVue";
config.output.publicPath = "/";

config.plugins.push(new webpack.BannerPlugin(banner));

module.exports = config;
