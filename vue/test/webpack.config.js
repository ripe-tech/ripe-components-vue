const config = require("uxf-webpack/config/webpack.config.full");

config.mode = "development";
config.output.devtoolModuleFilenameTemplate = "[absolute-resource-path]";
config.output.devtoolFallbackModuleFilenameTemplate = "[absolute-resource-path]?[hash]";
config.target = "node";
config.output.filename = "ripe-components-vue-test.min.js";

config.module.rules = config.module.rules.filter(
    rule =>
        !rule.use ||
        rule.use.every(loader => {
            const name = typeof loader === "object" ? loader.loader : loader;
            return name !== "babel-loader";
        })
);
config.module.rules.push({
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        {
            loader: "babel-loader",
            query: {
                sourceType: "unambiguous",
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            targets: { node: "10" },
                            useBuiltIns: "entry",
                            corejs: "3"
                        }
                    ]
                ],
                plugins: [
                    [
                        "@babel/plugin-transform-runtime",
                        {
                            regenerator: true
                        }
                    ]
                ]
            }
        }
    ]
});
config.module.rules.push({
    test: /\.(css|scss|sass)$/,
    use: ["null-loader"]
});

config.module.rules.find(rule => rule.loader === "vue-loader").options.optimizeSSR = false;

module.exports = config;
