var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
// var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var paths = {
  sass: ['./scss/**/*.scss']
};

var webpackConfig = {
    entry: './www/js/app.js',
    output: {
      path: './www',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        {test: /\.scss$/, loader: "style!css!sass"}
      ]
    }
};

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(webpackConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    // Start a webpack-dev-server
    var compiler = webpack({
        entry: './www/js/app.js',
        output: {
          path: '/www',
          filename: 'bundle.js'
        },
        module: {
          loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            {test: /\.scss$/, loader: "style!css!sass"}
          ]
        }
    });

    new WebpackDevServer(compiler, {
        // server and middleware options
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");

        // keep the server alive or continue?
        callback();
    });
});

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
  }
  done();
});
