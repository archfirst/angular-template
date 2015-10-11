'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var watch = require('gulp-watch');
var modRewrite = require('connect-modrewrite');

module.exports = function (config) {

    gulp.task('serve-dev', ['inject'], function () {
        serve(true /*isDev*/);
    });

    gulp.task('serve-build', ['build'], function () {
        serve(false /*isDev*/);
    });

    /**
     * Start BrowserSync
     */
    function serve(isDev) {

        // If build: watches the files, builds, and restarts browser-sync.
        // If dev: watches sass, compiles it to css, browser-sync handles reload
        var files = [].concat(config.js, config.html, config.sass);
        if (isDev) {
            watch(files, function() { gulp.start('inject', browserSync.reload); });
        } else {
            watch(files, function() { gulp.start('optimize', browserSync.reload); });
        }

        var options = {
            server: {
                baseDir: isDev ? config.tempDir : config.buildDir,
                routes: isDev ? {
                    '/bower_components': './bower_components',
                    '/fonts': './bower_components/bootstrap-sass/assets/fonts',
                    '/src': config.sourceDir,
                    '/images': config.sourceDir + 'images',
                    '/.tmp': config.tempDir
                } : {},
                middleware: [
                    modRewrite([ '!\\.\\w+$ /index.html [L]' ])
                ]
            },
            ghostMode: {
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'info',
            logPrefix: 'angular-patterns',
            notify: true
        };

        browserSync(options);
    }
};
