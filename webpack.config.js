var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var paths = {
    src: './src', //'src/main/frontend',
    dist: __dirname + '/target/generated-frontend/static'
};

// Webpack Config
var webpackConfig = {

    // misc configuration
    devtool: 'source-map', // disable source maps or switch to 'eval-source-maps' for faster builds

    //devtool: 'cheap-module-eval-source-map',
    cache: true,
    debug: true,

    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/app.ts',
    },
    output: {
        path: paths.dist,
        filename: 'bundles/[name].bundle.js',
        sourceMapFilename: 'bundles/[name].map',
        chunkFilename: 'bundles/[id].chunk.js'
    },

    module: {
        /*
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    path.join(__dirname, 'node_modules', 'rxjs'),
                    path.join(__dirname, 'node_modules', '@angular2-material'),
                ]
            }
        ],*/
        loaders: [
            // support for .html as raw text
            { test: /\.html$/, loader: 'raw', exclude: [__dirname + 'src/index.html'] },
            // support for css as raw
            { test: /\.css$/, loader: 'raw'},
            /* Support for SASS styles files.
            {test: /\.scss$/, loader: 'raw!sass'},*/
            /* Support for web fonts.
            {test: /\.(woff|eot)$/, loader: 'url?limit=10000'}, */
            /* Support for inline images.
            {test: /\.(png|jpg)$/, loader: 'url?limit=10000'},*/
            // Support for .ts files.
            { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/, /node_modules/] }
        ],
        noParse: [
            path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
            path.join(__dirname, 'node_modules', 'angular2', 'bundles')
        ]
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.html'/*, '.scss'*/]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], minChunks: Infinity }),
        new HtmlWebpackPlugin({
            template: paths.src + '/index.html'
        }),
        // Plugin: CopyWebpackPlugin
        // Description: Copy files and directories in webpack.
        //
        // Copies project static assets.
        //
        // See: https://www.npmjs.com/package/copy-webpack-plugin
        new CopyWebpackPlugin([{
            from: 'src/assets',
            to: 'assets'
        }])
        // include uglify in production
    ],

    devServer: {
        colors: true,
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        contentBase: paths.src
    },

    node: {
        global: 1,
        crypto: 'empty',
        module: 0,
        Buffer: 0,
        clearImmediate: 0,
        setImmediate: 0
    },
}

module.exports = webpackConfig;
