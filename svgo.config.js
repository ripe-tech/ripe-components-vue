module.exports = {
    plugins: [
        {
            name: "preset-default",
            params: {
                overrides: {
                    removeDimensions: false,
                    removeViewBox: false,
                    minifyStyles: false
                }
            }
        }
    ]
};
