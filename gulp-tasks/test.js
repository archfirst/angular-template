var gulp = require('gulp');

module.exports = function (config) {
    var log = config.log,
        args = config.args;

    gulp.task('test', [ 'vet', 'templatecache' ], function (done) {
        startTests(true /*singleRun*/, done);
    });

    gulp.task('autotest', function (done) {
        startTests(false /*singleRun*/, done);
    });


    function startTests(singleRun, done) {
        var child;
        var excludeFiles = [];
        var fork = require('child_process').fork;
        var karma = require('karma').server;
        var serverSpecs = [config.testDir + 'server-integration/**/*.spec.js'];

        if (args.startServers) {
            log('Starting servers');
            var savedEnv = process.env;
            savedEnv.NODE_ENV = 'dev';
            savedEnv.PORT = 3000;
            child = fork('../mock-server/app.js');
        } else {
            if (serverSpecs && serverSpecs.length) {
                excludeFiles = serverSpecs;
            }
        }

        karma.start({
            configFile: __dirname + '/../karma.conf.js',
            exclude: excludeFiles,
            singleRun: !!singleRun
        }, karmaCompleted);

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

