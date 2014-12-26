var gulp = require('gulp');

var paths = {
    sass: ['./grails-app/assets/stylesheets/**/*.scss'],
    js: [
        './grails-app/assets/javascripts/**/*.js',
        '!./grails-app/assets/javascripts/libs/**/*.js'
    ]
};

// JS hint for checking JS code
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var jshintConfigPath = '.jshintrc';

gulp.task('js-lint', function () {
    return gulp.src(paths.js)
        .pipe(jshint(jshintConfigPath))
        .pipe(jshint.reporter(jshintStylish));
});

// Scss lint for checking JS code
var scsslint = require('gulp-scss-lint');

gulp.task('scss-lint', function() {
    return gulp.src(paths.sass)
        .pipe(scsslint());
});

// This lint task should be run before commit code.
gulp.task('lint', ['js-lint', 'scss-lint']);
