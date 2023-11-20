const path = require("path")
const MiniCssExtractPlugin  = require("mini-css-extract-plugin")

module.exports = {
    mode: "development",
    entry: [
        '@babel/polyfill',
        "./src/app.jsx"
    ],
    output: {
        filename: "flask_react_router.js",
        path: path.resolve(__dirname, "static"),
        publicPath: "/static/"
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {legacy: true}],
                            ['@babel/plugin-proposal-class-properties', {loose: true}]
                        ]
                    }
                }]
            },
            {
                test: /\.(png|jpg|ico|svg|eot|woff|woff2|ttf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "flask_react_router.css",
            chunkFilename: "[id].css"
        })
    ]
}