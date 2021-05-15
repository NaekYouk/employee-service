const path = require("path");

const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: [path.resolve(__dirname, "src/public/js/index.js")],
  output: {
    path: path.resolve(__dirname, "build/public/build"),
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js"
  },
  devServer: {
    publicPath: "build/public/build",
    contentBase: path.join(__dirname, "src/public"),
    port: 9000
  },
  plugins: [
    new CompressionPlugin({
      test: /\.(jsx?|css|scss|svg|png|jpe?g|gif)$/,
      algorithm: "gzip"
    }),
    new MomentLocalesPlugin({
      localesToKeep: ["es-us"]
    }),
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, "src/public/build"),
      filename: "styles.css",
      chunkFilename: "styles.[contenthash].css",
      ignoreOrder: false
    }),
    new HtmlWebpackPlugin({
      favicon: path.resolve(__dirname, "src/public/static/icons/favicon-black.png"),
      template: path.resolve(__dirname, "src/public/static/template.html")
    })
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: path.resolve(__dirname, "src/public/js"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-export-default-from",
              "@babel/plugin-proposal-object-rest-spread",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: [
          path.resolve(__dirname, "src/public/static/icons"),
          path.resolve(__dirname, "src/public/static/img")
        ],
        use: [
          {
            loader: "url-loader"
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, "src/public/static/icons"),
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            sortAttrs: true
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        include: [path.resolve(__dirname, "src/public/static/fonts")],
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "src/public/js"), path.resolve(__dirname, "src/public/css")],
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]--[hash:base64:5]"
              }
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src/public/css"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      }
    ]
  },
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      automaticNameDelimiter: "-",
      automaticNameMaxLength: 30,
      cacheGroups: {
        default: false,
        node_modules: {
          name: "node_modules",
          chunks: "all",
          test: /[\\/]node_modules[\\/]/
        },
        static: {
          name: "static",
          chunks: "all",
          test: /[\\/]src[\\/]static[\\/]/
        }
      }
    }
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      Containers: path.resolve(__dirname, "src/public/js/containers"),
      Components: path.resolve(__dirname, "src/public/js/components"),
      Reducers: path.resolve(__dirname, "src/public/js/reducers"),
      Actions: path.resolve(__dirname, "src/public/js/actions"),
      Utils: path.resolve(__dirname, "src/public/js/utils"),
      Styles: path.resolve(__dirname, "src/public/css"),
      Icons: path.resolve(__dirname, "src/public/static/icons"),
      Images: path.resolve(__dirname, "src/public/static/img"),
      Root: path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src/public")
    }
  }
};

module.exports = [config];
