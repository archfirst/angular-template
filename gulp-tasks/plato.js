var plato = require('plato');
var glob = require('glob');
var gulp = require('gulp');

module.exports = function (config) {

    gulp.task('plato', function (done) {
        config.log('Analyzing source with Plato');
        config.log('Browse to /report/plato/index.html to see Plato results');

        startPlatoVisualizer(done);
    });

    /**
     * Start Plato inspector and visualizer
     */
    function startPlatoVisualizer(done) {
        config.log('Running Plato');

        var files = glob.sync(config.sourceDir + '**/*.js');
        var excludeFiles = /.*\.spec\.js/;

        var options = {
            title: 'Plato Inspections Report',
            exclude: excludeFiles
        };
        var outputDir = './report/plato';

        plato.inspect(files, outputDir, options, platoCompleted);

        function platoCompleted(report) {
            var overview = plato.getOverviewReport(report);
            if (config.args.verbose) {
                config.log(overview.summary);
            }
            if (done) {
                done();
            }
        }
    }

};

