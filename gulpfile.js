var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', () => {
  return gulp.src('js/src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('js/dist'));
});
