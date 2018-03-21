var webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'development',

  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],

  output: {
    path: path.resolve(__dirname, '/public/'),
    filename: 'bundle.js',
     publicPath: '/',
  },

  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 4000,
    contentBase: path. join(__dirname, 'public'),
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['es2015', 'react']
            }
          }
        ]
      },
    ]
  },

  resolve: {
    modules: ['node_modules',],
    extensions:['.js', '.json', '.jsx', '.css']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
