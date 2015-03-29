var gulp = require('gulp');

module.exports = function (config) {

    gulp.task('inject', ['styles', 'templatecache'], function () {

        return gulp
            .src(config.sourceDir + 'index.html')
            .pipe(config.$.inject(gulp.src(config.js)))
            .pipe(config.$.inject(gulp.src(config.tempDir + 'templates.js'), {name: 'inject:templates', read: false}))
            .pipe(config.$.inject(gulp.src(config.tempDir + 'app.css')))
            .pipe(gulp.dest(config.tempDir));

    });
};

