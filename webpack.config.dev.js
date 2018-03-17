const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.js',
    ]
    // ,
    // vendor: [
    //   'react',
    //   'react-dom',
    // ],
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js'
  },

  // resolve: {
  //   extensions: ['.js', '.jsx'],
  //   modules: [
  //     'src',
  //     'node_modules',
  //   ],
  // },

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract(['css-loader?importLoaders=1&sourceMap', 'sass-loader']),
      }, {
        test: /\.js$/,
        exclude: [/node_modules/, /.+\.config.js/],
        use: [
          {
            loader: "babel-loader",
          },
        ],
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              outputPath: 'assets/',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
    new ExtractTextPlugin('style.css'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true,
    historyApiFallback: true, // fixes react router subpage hmr problem
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  target: "electron-renderer",
};
