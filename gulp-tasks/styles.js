var gulp = require('gulp');
var reload = require('browser-sync').reload;

module.exports = function (config) {

    gulp.task('styles', ['clean-styles'], function () {
        config.log('Compiling Sass --> CSS');

        return gulp
            .src(config.sourceDir + 'app.scss')
            .pipe(config.$.plumber()) // exit gracefully if something fails after this
            .pipe(config.$.sass())
            .pipe(config.$.autoprefixer({browsers: ['last 2 version', '> 5%']}))
            .pipe(gulp.dest(config.tempDir))
            .pipe(reload({stream: true}));
    });

    gulp.task('sass-watcher', function () {
        gulp.watch([config.sourceDir + '**/*.scss'], ['styles']);
    });

};

