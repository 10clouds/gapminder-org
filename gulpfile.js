var fs = require('fs');
var gulp = require('gulp');
var s3 = require('gulp-s3');

gulp.paths = {
  tssrc: [
    '**/*.ts',
    '!node_modules/**/*',
    '!bundles/**/*',
    '!typings/**/*',
    '!**/*.{ts,coffee}.js']
};

// Code linting
var tslint = require('gulp-tslint');

var paths = gulp.paths;

gulp.task('tslint', function () {
  return gulp.src(paths.tssrc)
    .pipe(tslint())
    .pipe(tslint.report('verbose', {
      emitError: true,
      reportLimit: 0
    }));
});

// gulp default task
gulp.task('default', function () {
  gulp.start('tslint');
});

var s3Credentials = JSON.parse(
  fs.readFileSync('./aws.json') //eslint-disable-line no-sync
);

gulp.task('deploy', function () {
  gulp.src('./dist/**')
    .pipe(s3(s3Credentials));
});
