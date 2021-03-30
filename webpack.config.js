const path = require("path");
const webpack = require("webpack");

const config = require("uxf-webpack/config/webpack.config.full");

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

config.externals = config.externals || {};
config.externals.vue = "vue";

config.plugins.push(new webpack.BannerPlugin(banner));

config.module.rules = config.module.rules.filter(rule => rule.loader !== "file-loader");
config.module.rules.push(
    {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: "url-loader",
        options: {
            esModule: false
        }
    },
    {
        test: /\.svga$/,
        loader: "file-loader",
        options: {
            name: "[contenthash].svg",
            esModule: false
        }
    }
);

module.exports = config;
