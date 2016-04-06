var path = require('path');
var _ = require('lodash');
var gulp = require('gulp');
var webpackStream = require('webpack-stream')
var webpack = require('webpack')
var WebpackDevServer = require("webpack-dev-server")

function pack(name) {
  var options = {
    'process.env.NODE_ENV': '"production"',
    errorDetails: true,
    debug: false,
    output: {
      path: path.join(__dirname, '../public/assets/js'),
      publicPath: "/assets/",
      filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!less' }
      ]
    },
    externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "electron": "electron"
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
      })
    ]
  }
  return gulp.src(name === 'mobile' ? './src/mobile/index.js' : './src/index.js')
    .pipe(webpackStream(options))
    .pipe(gulp.dest(name === 'mobile' ? './public/assets/mobile/js' : './public/assets/js'))
}

function dev(name, callback) {
  //var filename = name.split('/')[1].substr(0, 3) + '-' + name.split('/')[1].substr(3) + '.js'
  var filename = _.kebabCase(name.split('/')[1]) + '.js'
  var options = {
    entry: './' + name + '.js',
    output: {
      path: path.join(__dirname, '../../../public/assets/js'),
      publicPath: "/assets/",
      filename: "bundle.js"
    },
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.less$/, exclude: /node_modules/, loader: 'style!css!less' }
      ]
    },
    devtool: "sourcemap",
    debug: true
  }
  var port = 9393

  var compiler = webpack(options)
  return new WebpackDevServer(compiler, {
    stats: {
      colors: true
    },
    historyApiFallback: true
  }).listen(port, "localhost", function(err) {
    if (err) throw err
    callback()
  })
}

gulp.task('pack', function(callback) {
  pack('web', callback)
})

gulp.task('pack-mobile', function(callback) {
  pack('mobile', callback)
})

gulp.task('dev', function(callback) {
  dev('src/index', callback)
})

gulp.task('dev-mobile', function(callback) {
  dev('src/mobile/index', callback)
})
