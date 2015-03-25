var gulp = require('gulp');

module.exports = function (config) {

    gulp.task('vet', vet);


    /**
     * vet the code and create coverage report
     * @return {Stream}
     */
    function vet() {
        config.log('Analyzing source with JSHint and JSCS');

        return gulp
            .src([
                config.sourceDir + '**/*.js',
                config.testDir + '**/*.js',
                './*.js'
            ])
            .pipe(config.$.if(config.args.verbose, config.$.print()))
            .pipe(config.$.jshint())
            .pipe(config.$.jshint.reporter('jshint-stylish', {verbose: true}))
            .pipe(config.$.jshint.reporter('fail'))
            .pipe(config.$.jscs());
    }
};


