var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var watch = require('gulp-watch');
var notify = require('gulp-notify');

var config = require('./config').sass;
var ejs = require("gulp-ejs");
var gutil = require('gulp-util');
var rename = require('gulp-rename')
// live reload
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './htdocs',
      index: '../src/dev/index.html'
    },
    files: ['./**/*.html']
  });
});

gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(plumber({                           // エラー出たら通知
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sass())
    .pipe(concat(config.output))              // 1つのファイルに固める
    .pipe(autoprefixer(config.autoprefixer))  // vendor-prefixつける
    .pipe(gulpif(config.minify, minify()))    // 必要ならminify
    .pipe(gulp.dest(config.dest))             // 出力
    .pipe(browserSync.reload({                // ブラウザリロード
      stream: true
    }));
});
gulp.task('ejs', function() {
    gulp.src(
        ["./src/dev/**/*.ejs",'!' + "./src/dev/**/_*.ejs"]
    )
    .pipe(ejs())
    .pipe(rename({extname: '.html'}))
    .on('error', gutil.log)
        .pipe(gulp.dest("./htdocs/")) //注2
});


gulp.task('watchSass', function () {
  return watch('./src/scss/**/*', function () {
    return gulp.start(['sass']);
  });
});
gulp.task('watchEjs', function () {
  return watch("./src/dev/**/*.ejs", function () {
    return gulp.start(['ejs']);
  });
});

gulp.task('default', ['sass', 'browser-sync', 'watchSass', 'watchEjs']);
