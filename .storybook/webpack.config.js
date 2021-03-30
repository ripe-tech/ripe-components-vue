const path = require("path");

module.exports = async ({ config, mode }) => {
    config.module.rules.push(
        {
            test: /\.scss$/,
            loaders: ["style-loader", "css-loader", "sass-loader"],
            include: path.resolve(__dirname, "../")
        },
        {
            test: /\.stories\.jsx?$/,
            loaders: [require.resolve("@storybook/source-loader")],
            enforce: "pre"
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
    return config;
};
