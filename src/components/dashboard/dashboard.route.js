(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/');
    }

    function getStates() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    template: '<dashboard></dashboard>',
                    title: 'Dashboard',
                    settings: {
                        nav: 1  // position in navbar
                    }
                }
            }
        ];
    }
})();
