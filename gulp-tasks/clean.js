var del = require('del');
var gulp = require('gulp');

module.exports = function (config) {

    gulp.task('clean', function (done) {
        var delconfig = [].concat(config.buildDir, './.sass-cache/', config.tempDir, './report/');

        config.log('Cleaning: ' + config.$.util.colors.blue(delconfig));

        del(delconfig, done);
    });

    gulp.task('clean-fonts', function (done) {
        clean(config.buildDir + 'fonts/**/*.*', done);
    });

    gulp.task('clean-images', function (done) {
        clean(config.buildDir + 'images/**/*.*', done);
    });

    gulp.task('clean-code', function (done) {
        var files = [].concat(
            config.tempDir + '**/*.js',
            config.buildDir + '**/*.js',
            config.buildDir + '**/*.html'
        );

        clean(files, done);
    });

    gulp.task('clean-styles', function (done) {
        var files = [].concat(
            config.tempDir + '**/*.css',
            config.buildDir + '**/*.css'
        );

        clean(files, done);
    });

    function clean(path, done) {
        config.log('Cleaning: ' + config.$.util.colors.blue(path));
        del(path, done);
    }


};

