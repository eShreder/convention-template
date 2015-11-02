'use strict';

var gulp = require('gulp');

//plugins
var sass = require('gulp-sass'),
  connect = require('gulp-connect'),
  jade = require('gulp-jade');

gulp.task('connect', function() {
  connect.server({
    root: './build/',
    port: 8083,
    livereload: true
  });
});

gulp.task('html-reload', function() {
  gulp.src('./build/*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src('./src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

gulp.task('jade', function() {
  var locals = {};
  gulp.src('./src/jade/*.jade')
    .pipe(jade({
      locals: locals
    }))
    .pipe(gulp.dest('./build/'))
});

gulp.task('watch', function() {
  gulp.watch(['./src/scss/*.scss'], ['sass']);
  gulp.watch(['./src/jade/*.jade','./src/jade/**/*.jade'], ['jade']);
  gulp.watch(['./build/*.html'], ['html-reload']);
});

gulp.task('default', ['connect', 'watch']);