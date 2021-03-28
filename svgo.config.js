const { extendDefaultPlugins } = require("svgo");

module.exports = {
    plugins: extendDefaultPlugins([
        {
            name: "removeDimensions",
            active: false
        },
        {
            name: "removeViewBox",
            active: false
        },
        {
            name: "minifyStyles",
            active: false
        }
    ])
};
