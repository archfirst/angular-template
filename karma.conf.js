/* jshint node: true */

'use strict';

module.exports = function (config) {

    config.set({
            // base path that will be used to resolve all patterns (eg. files, exclude)
            basePath: './',

            // frameworks to use
            // some available frameworks: https://npmjs.org/browse/keyword/karma-adapter
            frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],

            // list of files / patterns to load in the browser
            files: [
                'bower_components/angular/angular.js',
                'bower_components/angular-animate/angular-animate.js',
                'bower_components/angular-bootstrap/ui-bootstrap.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                'bower_components/angular-sanitize/angular-sanitize.js',
                'bower_components/angular-toastr/dist/angular-toastr.js',
                'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'bower_components/bardjs/dist/bard.js',
                'bower_components/lodash/lodash.js',

                'test/helpers/*.js',
                'src/**/*.module.js',
                'src/**/*.js',
                '.tmp/templates.js',
                'test/**/*.spec.js'
            ],

            // list of files to exclude
            exclude: [],

            proxies: {
                '/': 'http://localhost:8888/'
            },

            // preprocess matching files before serving them to the browser
            // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
            preprocessors: {
                'src/**/*.js': ['coverage']
            },

            // test results reporter to use
            // possible values: 'dots', 'progress', 'coverage'
            // available reporters: https://npmjs.org/browse/keyword/karma-reporter
            reporters: ['progress', 'coverage'],

            coverageReporter: {
                dir: 'report/coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},

                    // reporters supporting the `file` property, use `subdir` to directly
                    // output them in the `dir` directory.
                    // omit `file` to output to the console.
                    // {type: 'cobertura', subdir: '.', file: 'cobertura.txt'},
                    // {type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt'},
                    // {type: 'teamcity', subdir: '.', file: 'teamcity.txt'},
                    // {type: 'text'}, subdir: '.', file: 'text.txt'},

                    {type: 'text-summary'} //, subdir: '.', file: 'text-summary.txt'}
                ]
            },

            // web server port
            port: 9876,

            // enable / disable colors in the output (reporters and logs)
            colors: true,

            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
            // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,

            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: true,

            // start these browsers
            // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
            //        browsers: ['Chrome', 'ChromeCanary', 'FirefoxAurora', 'Safari', 'PhantomJS'],
            browsers: ['Chrome'],

            // Continuous Integration mode
            // if true, Karma captures browsers, runs the tests and exits
            singleRun: false
        }
    );
};
