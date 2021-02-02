const path = require("path");

module.exports = function override(config, env) {
    const modifiedConfig = {
        ...config,
        entry: "./src/index.tsx",
        output: {
            path: path.join(__dirname, "/build"),
            filename: "bundle.min.js",
            publicPath: "/"
        }
    };
    return modifiedConfig;
};