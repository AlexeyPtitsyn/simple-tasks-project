const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  watchOptions: {
    poll: true,
    ignored: '/node_modules/'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "resolve-url-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|tiff)$/,
        use: [
            'file-loader?name=assets/[name].[ext]'
        ]
      },
      {
         test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
         use: ['file-loader']
       }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  }
}
