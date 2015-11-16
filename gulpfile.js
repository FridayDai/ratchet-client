var gulp = require('gulp');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var webpackConfig = require("./webpack.config.js");
var path = require('path');
var livereload = require('gulp-livereload');

var paths = {
    sass: ['./grails-app/assets/stylesheets/**/*.scss'],
    js: [
        './grails-app/assets/javascripts/**/*.js',
        '!./grails-app/assets/javascripts/libs/**/*.js',
        '!./grails-app/assets/javascripts/dist/**/*.js',
        '!./grails-app/assets/javascripts/bower_components/**/*.js'
    ]
};

// JS hint for checking JS code
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var jshintConfigPath = '.jshintrc';

gulp.task('js-lint', function () {
    return gulp.src(paths.js)
        .pipe(jshint(jshintConfigPath))
        .pipe(jshint.reporter(jshintStylish))
        .pipe(jshint.reporter('fail'));
});

// Scss lint for checking JS code
var scsslint = require('gulp-scss-lint');

gulp.task('scss-lint', function() {
    return gulp.src(paths.sass)
        .pipe(scsslint());
});

// This lint task should be run before commit code.
gulp.task('lint', ['js-lint', 'scss-lint']);

var notifyInfo = {
    title: 'Gulp'
};

var plumberErrorHandler = { errorHandler: notify.onError({
        title: notifyInfo.title,
        message: "Error: <%= error.message %>"
    })
};

// modify some webpack config options
var myDevConfig = webpackConfig;
myDevConfig.devtool = "eval";
myDevConfig.debug = true;
myDevConfig.bail = true;

// scripts:webpack
gulp.task('webpack', function() {
    return gulp.src(paths.js)
        .pipe(plumber(plumberErrorHandler))
        .pipe(gulpWebpack(myDevConfig, webpack))
        .pipe(gulp.dest(path.join(myDevConfig.output.path)));
});

// styles
gulp.task('styles', function() {
    return gulp.src(paths.sass)
        .pipe(plumber(plumberErrorHandler))
        .pipe(compass({
            project: path.join(__dirname, 'grails-app', 'assets', 'stylesheets'),
            config_file: './config.rb'
        }));
});

//watch
gulp.task('live', function() {
    livereload.listen();

    //watch .scss files
    gulp.watch(paths.sass, ['styles']);

    //watch .js files
    gulp.watch(paths.js, ['webpack']);
});
