var gulp = require('gulp');

module.exports = function (config) {

    gulp.task('styles', ['clean-styles'], function () {
        config.log('Compiling Sass --> CSS');

        return gulp
            .src(config.sourceDir + 'app.scss')
            .pipe(config.$.plumber()) // exit gracefully if something fails after this
            .pipe(config.$.sass())
            .pipe(config.$.autoprefixer({browsers: ['last 2 version', '> 5%']}))
            .pipe(gulp.dest(config.tempDir));
    });

    gulp.task('sass-watcher', function () {
        gulp.watch([config.sourceDir + '**/*.scss'], ['styles']);
    });

};

