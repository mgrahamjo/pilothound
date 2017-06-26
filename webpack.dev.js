const path = require('path');

module.exports = {
    entry: './static/app.js',
    output: {
        path: path.join(__dirname, 'static/dist'),
        filename: 'app.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }
        }]
    },
    devtool: 'source-map'
};
