'use strict';

var gulp = require('gulp');

//plugins
var sass = require('gulp-sass'),
  connect = require('gulp-connect'),
  jade = require('gulp-jade');

gulp.task('connect', function() {
  connect.server({
    root: './build/',
    listen: '0.0.0.0',
    port: 8083,
    livereload: true
  });
});

gulp.task('js', function() {
  gulp.src('./src/js/*.js')
    .pipe(gulp.dest('./build/js'))

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
    .pipe(jade({}))
    .pipe(gulp.dest('./build/'))
});

gulp.task('watch', function() {
  gulp.watch(['./src/scss/*.scss', './src/jade/**/*.scss'], ['sass']);
  gulp.watch(['./src/jade/*.jade','./src/jade/**/*.jade'], ['jade']);
  gulp.watch(['./build/*.html'], ['html-reload']);
  gulp.watch(['./src/js/**/*.js'], ['js','html-reload']);
});

gulp.task('default', ['connect', 'watch']);