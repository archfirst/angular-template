var gulp = require('gulp');

module.exports = function (config) {

    gulp.task('fonts', ['clean-fonts'], function () {
        config.log('Copying fonts');

        var fontDir = './bower_components/bootstrap-sass/assets/fonts/**/*.*';

        return gulp
            .src(fontDir)
            .pipe(gulp.dest(config.buildDir + 'fonts'));
    });

    gulp.task('images', ['clean-images'], function () {
        config.log('Compressing and copying images');

        return gulp
            .src(config.sourceDir + 'images/**/*.*')
            .pipe(config.$.imagemin({optimizationLevel: 4}))
            .pipe(gulp.dest(config.buildDir + 'images'));
    });


};

