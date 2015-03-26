var browserSync = require('browser-sync');
var gulp = require('gulp');

module.exports = function (config) {

    var args = config.args,
        log = config.log,
        notify = config.notify,
        $ = config.$,
        serverConfig = {
            server: './mock-server/',
            nodeServer: './mock-server/app.js'
        };

    gulp.task('serve-dev', [ 'inject' ], function () {
        serve(true /*isDev*/);
    });

    /**
     * serve the build environment
     * --debug-brk or --debug
     * --nosync
     */
    gulp.task('serve-build', [ 'build' ], function () {
        var msg = {
            title: 'gulp build',
            subtitle: 'Deployed to the build folder',
            message: 'Running `gulp serve-build`'
        };
        log(msg);
        notify(msg);
        serve(false /*isDev*/);
    });

    function serve(isDev) {
        var debug = args.debug || args.debugBrk;
        var exec;
        var nodeOptions = {
            script: serverConfig.nodeServer,
            delayTime: 1,
            env: {
                'PORT': config.proxyPort,
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch: [ serverConfig.server ]
        };

        if (debug) {
            log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
            exec = require('child_process').exec;
            exec('node-inspector');
            nodeOptions.nodeArgs = [ '--debug=5858' ];
        }

        return $.nodemon(nodeOptions)
            .on('restart', [ 'vet' ], function (ev) {
                log('*** nodemon restarted');
                log('files changed:\n' + ev);
                setTimeout(function () {
                    browserSync.notify('reloading now ...');
                    browserSync.reload({ stream: false });
                }, config.browserReloadDelay);
            })
            .on('start', function () {
                log('*** nodemon started');
                startBrowserSync(isDev);
            })
            .on('crash', function () {
                log('*** nodemon crashed: script crashed for some reason');
            })
            .on('exit', function () {
                log('*** nodemon exited cleanly');
            });
    }

    /**
     * Start BrowserSync
     * --nosync will avoid browserSync
     */
    function startBrowserSync(isDev) {
        if (args.nosync || browserSync.active) {
            return;
        }

        log('Starting BrowserSync on port ' + config.port);

        // If build: watches the files, builds, and restarts browser-sync.
        // If dev: watches sass, compiles it to css, browser-sync handles reload
        if (isDev) {
            gulp.watch([ config.sass ], [ 'styles' ])
                .on('change', changeEvent);
        } else {
            gulp.watch([ config.sass, config.js, config.html ], [ 'optimize', browserSync.reload ])
                .on('change', changeEvent);
        }

        var options = {
            proxy: 'localhost:' + config.proxyPort,
            port: config.port,
            files: isDev ? [
                config.sourceDir + '**/*.*',
                '!' + config.sass,
                config.tempDir + '**/*.*'
            ] : [],
            ghostMode: { // these are the defaults t,f,t,t
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'debug',
            logPrefix: 'angular-patterns',
            notify: true,
            reloadDelay: 0 //1000
        };

        browserSync(options);
    }


    function changeEvent(event) {
        var srcPattern = new RegExp('/.*(?=/' + config.sourceDir + ')/');
        log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
    }
};

