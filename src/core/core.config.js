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

        $compileProvider.debugInfoEnabled(false);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        routerHelperProvider.configure({docTitle: config.appTitle + ': '});
    }
})();
