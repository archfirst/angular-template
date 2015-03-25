var gulp = require('gulp');
var wiredep = require('wiredep').stream;

module.exports = function (config) {

    var injectConfig = {
        indexHtml: config.sourceDir + 'index.html',
        css: config.tempDir + 'styles.css',
        js: config.js
    };

    gulp.task('wiredep', function () {
        config.log('Wiring the bower dependencies into the html');

        var options = {
            bowerJson: require('../bower.json'),
            directory: './bower_components/',
            ignorePath: '..'
        };

        return gulp
            .src(injectConfig.indexHtml)
            .pipe(wiredep(options))
            .pipe(config.$.inject(gulp.src(injectConfig.js)))
            .pipe(gulp.dest(config.tempDir));
    });

    gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function () {
        config.log('Wire up css into the html, after files are ready');

        return gulp
            .src(injectConfig.indexHtml)
            .pipe(config.$.inject(gulp.src(injectConfig.css)))
            .pipe(gulp.dest(config.tempDir));
    });


};

