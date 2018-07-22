const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');


const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};


module.exports = {
    target: 'web',
    mode: 'production',
    entry: {
        bundle: path.join(dirApp, 'index')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('[name].[md5:contenthash:hex:20].css'),
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'index.ejs'),
          favicon: 'favicon.ico',
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          },
          inject: true,
        }),
        new UglifyJsPlugin({ sourceMap: true }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.eot(\?v=\d+.\d+.\d+)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      name: '[path][name].[ext]'
                    }
                  }
                ]
              },
              {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      mimetype: 'application/font-woff',
                      name: '[path][name].[ext]'
                    }
                  }
                ]
              },
              {
                test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      mimetype: 'application/octet-stream',
                      name: '[path][name].[ext]'
                    }
                  }
                ]
              },
              {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,
                      mimetype: 'image/svg+xml',
                      name: '[path][name].[ext]'
                    }
                  }
                ]
              },
              {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[path][name].[ext]'
                    }
                  }
                ]
              },
              {
                test: /(\.css|\.scss|\.sass)$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                  use: [
                    {
                      loader: 'css-loader',
                      options: {
                        minimize: true,
                        sourceMap: true
                      }
                    }, {
                      loader: 'postcss-loader',
                      options: {
                        plugins: () => [
                          require('autoprefixer')
                        ],
                        sourceMap: true
                      }
                    }, {
                      loader: 'sass-loader',
                      options: {
                        includePaths: [dirAssets],
                        sourceMap: true
                      }
                    }
                  ]
                })
              }
        ]
    }
};

