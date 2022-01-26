const path = require("path");
const vueLoader = require("vue-loader");

const VueLoaderPlugin = vueLoader.VueLoaderPlugin;

module.exports = {
    entry: "./vue",
    target: "node",
    mode: "development",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "ripe-components-vue-test.min.js",
        library: "RipeComponentsVueTest",
        libraryTarget: "umd",
        devtoolModuleFilenameTemplate: "[absolute-resource-path]",
        devtoolFallbackModuleFilenameTemplate: "[absolute-resource-path]?[hash]"
    },
    plugins: [new VueLoaderPlugin({})],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                options: {
                    loaders: {
                        js: "babel-loader",
                        scss: "vue-style-loader!css-loader!sass-loader",
                        sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax"
                    },
                    optimizeSSR: false
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                use: ["null-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
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
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/,
                loader: "file-loader",
                options: {
                    name: (path, query) => {
                        if (process.env.NODE_ENV === "development") {
                            return "[path][name].[ext]?[hash]";
                        }
                        return "[contenthash].[ext]";
                    },
                    esModule: false
                }
            },
            {
                test: /\.svga$/,
                loader: "file-loader",
                options: {
                    name: (path, query) => {
                        if (process.env.NODE_ENV === "development") {
                            return "[path][name].svg?[hash]";
                        }
                        return "[contenthash].svg";
                    },
                    esModule: false
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    esModule: false
                }
            }
        ]
    },
    resolve: {
        alias: {
            base$: "../../../js",
            vue$: "vue/dist/vue.esm.js"
        },
        fallback: {
            fs: false,
            http: false,
            https: false
        }
    },
    performance: {
        hints: false
    },
    devtool: "inline-source-map"
};
