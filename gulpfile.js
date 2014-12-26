var gulp = require('gulp');

var paths = {
    js: [
        './grails-app/assets/javascripts/**/*.js',
        '!./grails-app/assets/javascripts/libs/**/*.js'
    ]
};

var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var jshintConfigPath = '.jshintrc';

gulp.task('lint', function () {
    return gulp.src(paths.js)
        .pipe(jshint(jshintConfigPath))
        .pipe(jshint.reporter(jshintStylish));
});
