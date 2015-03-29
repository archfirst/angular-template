var gulp = require('gulp');
var del = require('del');

module.exports = function (config) {

    var $ = config.$,
        log = config.log;

    gulp.task('build', [ 'optimize', 'images', 'fonts' ], function () {
        log('Building everything');
        del(config.tempDir);
    });

    gulp.task('optimize', [ 'inject', 'test' ], function () {
        log('Optimizing the js, css, and html');

        var assets = $.useref.assets({ searchPath: './' });

        // Filters are named for the gulp-useref path
        var cssFilter = $.filter('**/*.css');
        var jsAppFilter = $.filter('**/app.js');
        var jslibFilter = $.filter('**/lib.js');

        return gulp
            .src(config.tempDir + 'index.html')
            .pipe($.plumber())
            .pipe(assets) // Gather all assets from the html with useref
            // Get the css
            .pipe(cssFilter)
            .pipe($.csso())
            .pipe(cssFilter.restore())
            // Get the custom javascript
            .pipe(jsAppFilter)
            .pipe($.ngAnnotate({ add: true }))
            .pipe($.uglify())
            .pipe(getHeader())
            .pipe(jsAppFilter.restore())
            // Get the vendor javascript
            .pipe(jslibFilter)
            .pipe($.uglify())
            .pipe(jslibFilter.restore())
            // Take inventory of the file names for future rev numbers
            .pipe($.rev())
            // Apply the concat and file replacement with useref
            .pipe(assets.restore())
            .pipe($.useref())
            // Replace the file names in the html with rev numbers
            .pipe($.revReplace())
            .pipe(gulp.dest(config.buildDir));
    });


    function getHeader() {
        var pkg = require('../package.json');
        var template = [ '/**',
            ' * <%= pkg.name %> - <%= pkg.description %>',
            ' * @authors <%= pkg.authors %>',
            ' * @version v<%= pkg.version %>',
            ' * @link <%= pkg.homepage %>',
            ' * @license <%= pkg.license %>',
            ' */',
            ''
        ].join('\n');
        return $.header(template, {
            pkg: pkg
        });
    }

};

