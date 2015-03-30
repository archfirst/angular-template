(function () {
    'use strict';

    var core = angular.module('app.core');

    var config = {
        appErrorPrefix: '[Angular Template Error] ',
        appTitle: 'Angular Template'
    };

    core.value('config', config);

    core.config(configure);

    configure.$inject =
        ['$compileProvider', '$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider'];

    /* @ngInject */
    function configure(
        $compileProvider, $logProvider, routerHelperProvider, exceptionHandlerProvider) {

        // During development, you may want to set debugInfoEnabled to true. This is required for tools like
        // Protractor, Batarang and ng-inspector to work correctly. However do not check in this change.
        // This flag must be set to false in production for a significant performance boost.
        $compileProvider.debugInfoEnabled(false);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});
    }
})();
