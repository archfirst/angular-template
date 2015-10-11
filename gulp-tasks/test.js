'use strict';

var gulp = require('gulp');

module.exports = function (config) {
    var log = config.log;

    gulp.task('test', [ 'vet', 'templatecache' ], function (done) {
        startTests(true /*singleRun*/, done);
    });

    gulp.task('autotest', function (done) {
        startTests(false /*singleRun*/, done);
    });


    function startTests(singleRun, done) {
        var child;
        var excludeFiles = [];
        var Server = require('karma').Server;
        var serverSpecs = [config.testDir + 'server-integration/**/*.spec.js'];

        if (serverSpecs && serverSpecs.length) {
            excludeFiles = serverSpecs;
        }

        var server = new Server({
            configFile: __dirname + '/../karma.conf.js',
            exclude: excludeFiles,
            singleRun: !!singleRun
        }, karmaCompleted);
        server.start();

        ////////////////

        function karmaCompleted(karmaResult) {
            log('Karma completed');
            if (child) {
                log('shutting down the child process');
                child.kill();
            }
            if (karmaResult === 1) {
                done('karma: tests failed with code ' + karmaResult);
            } else {
                done();
            }
        }
    }

};
