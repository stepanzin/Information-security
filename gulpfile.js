'use strict';
var gulp = require('gulp');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
var ch = require('chalk');


var path = {
  srcPath: 'js/src/**/*.js',
  destPath: 'js/dist'
}

gulp.task('default', ['ES6']);

gulp.task('ES6', () => {
  return gulp.src(path.srcPath)
    .pipe(watch(path.srcPath, (e)=>{
      console.log(`${ch.yellow(e.path.match(/(\w+\.js)/g))} was edited! Running compile task`)
    }))
    .pipe(babel())
    .pipe(gulp.dest(path.destPath));
});
