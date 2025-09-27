const path = require("path");

module.exports = {
    entry: {
        app: "./scripts/index.js",   // frontend principal
        form: "./scripts/form.js"    // formulario
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].bundle.js",
    },
    mode: "development"
};
