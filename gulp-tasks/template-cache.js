var gulp = require('gulp');

module.exports = function (config) {

    var templateCacheConfig = {
        templateFiles: [
            config.sourceDir + '**/*.html',
            '!' + config.sourceDir + 'index.html'
        ],
        file: 'templates.js',
        destDir: config.tempDir,
        options: {
            module: 'app.core',
            root: '',
            standAlone: false
        }
    };

    gulp.task('templatecache', ['clean-code'], function () {
        config.log('Creating an AngularJS $templateCache at ' + config.tempDir + templateCacheConfig.file);

        return gulp
            .src(templateCacheConfig.templateFiles)
            .pipe(config.$.if(config.args.verbose, config.$.bytediff.start()))
            .pipe(config.$.minifyHtml({empty: true}))
            .pipe(config.$.if(config.args.verbose, config.$.bytediff.stop(bytediffFormatter)))
            .pipe(config.$.angularTemplatecache(
                templateCacheConfig.file,
                templateCacheConfig.options
            ))
            .pipe(gulp.dest(templateCacheConfig.destDir));
    });


    function bytediffFormatter(data) {
        var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
        return data.fileName + ' went from ' +
            (data.startSize / 1000).toFixed(2) + ' kB to ' +
            (data.endSize / 1000).toFixed(2) + ' kB and is ' +
            formatPercent(1 - data.percent, 2) + '%' + difference;
    }


    function formatPercent(num, precision) {
        return (num * 100).toFixed(precision);
    }

};

