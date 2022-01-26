const path = require("path");

module.exports = async ({ config, mode }) => {
    config.module.rules.push(
        {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
            include: path.resolve(__dirname, "../")
        },
        {
            test: /\.stories\.jsx?$/,
            use: [require.resolve("@storybook/source-loader")],
            enforce: "pre"
        },
        {
            test: /\.svga$/,
            loader: "url-loader",
            options: {
                mimetype: "image/svg+xml",
                esModule: false
            }
        }
    );
    return config;
};
