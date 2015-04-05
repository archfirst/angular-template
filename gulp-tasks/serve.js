var browserSync = require('browser-sync');
var gulp = require('gulp');
var watch = require('gulp-watch');
var modRewrite = require('connect-modrewrite');

module.exports = function (config) {

    var args = config.args,
        log = config.log,
        notify = config.notify,
        $ = config.$;

    gulp.task('serve-dev', ['inject'], function () {
        serve(true /*isDev*/);
    });

    /**
     * serve the build environment
     * --debug-brk or --debug
     * --nosync
     */
    gulp.task('serve-build', ['build'], function () {
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
            script: './mock-server/app.js',
            delayTime: 1,
            env: {
                'PORT': config.proxyPort,
                'NODE_ENV': isDev ? 'dev' : 'build'
            },
            watch: ['./mock-server/']
        };

        if (debug) {
            log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
            exec = require('child_process').exec;
            exec('node-inspector');
            nodeOptions.nodeArgs = ['--debug=5858'];
        }

        return $.nodemon(nodeOptions)
            .on('restart', ['vet'], function (ev) {
                log('*** nodemon restarted');
                log('files changed:\n' + ev);
                setTimeout(function () {
                    browserSync.notify('reloading now ...');
                    browserSync.reload({stream: false});
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
        var files = [].concat(config.js, config.html, config.sass);
        if (isDev) {
            watch(files, function(){ gulp.start('inject', browserSync.reload); });
        } else {
            watch(files, function(){ gulp.start('optimize', browserSync.reload); });
        }

        var options = {
            server: {
                baseDir: isDev ? config.tempDir : config.buildDir,
                routes: isDev ? {
                    '/bower_components': './bower_components',
                    '/fonts': './bower_components/bootstrap-sass/assets/fonts',
                    '/src': config.sourceDir,
                    '/images': config.sourceDir + 'images',
                    '/.tmp': config.tempDir
                } : {},
                middleware: [
                    modRewrite([ '!\\.\\w+$ /index.html [L]' ])
                ]
            },
            port: config.port,
            ghostMode: {
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'info',
            logPrefix: 'angular-patterns',
            notify: true,
            reloadDelay: 0 //1000
        };

        browserSync(options);
    }

};

