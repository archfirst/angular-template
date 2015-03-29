/* jshint node: true, -W024, -W040, -W098, -W126 */

'use strict';

var $ = require('gulp-load-plugins')({lazy: true}),
    src = './src/';

module.exports = {

    // --- Configurables ---
    sourceDir: src,
    testDir: './test/',
    buildDir: './build/',
    tempDir: './.tmp/',
    proxyPort: 7203,
    port: 3000,
    browserReloadDelay: 1000,
    js: [
        // module files in desired order
        src + '**/*.module.js',

        // remaining files in desired order
        src + 'core/**/*.js',
        src + 'framework/**/*.js',
        src + '**/*.js'
    ],
    html: src + '**/*.html',
    sass: src + '**/*.scss',
    $: $,
    args: require('yargs').argv,

    // --- Utilities ---
    log: function log(msg) {
        if (typeof(msg) === 'object') {
            for (var item in msg) {
                if (msg.hasOwnProperty(item)) {
                    $.util.log($.util.colors.blue(msg[item]));
                }
            }
        } else {
            $.util.log($.util.colors.blue(msg));
        }
    },
    notify: function notify(options) {
        var notifier = require('node-notifier');
        notifier.notify(options);
    }

};
