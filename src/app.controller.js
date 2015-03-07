(function() {
    'use strict';

    angular
        .module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$state', 'routerHelper'];

    /* @ngInject */
    function AppController($state, routerHelper) {
        var vm = this;
        var states = routerHelper.getStates();

        vm.isActive = isActive;
        vm.navRoutes = [];

        activate();

        function activate() {
            getNavRoutes();
        }

        function getNavRoutes() {
            vm.navRoutes = states
                .filter(function(r) {
                    return r.settings && r.settings.nav;
                })
                .sort(function(r1, r2) {
                    return r1.settings.nav - r2.settings.nav;
                });
        }

        function isActive(route) {
            if (!route.title || !$state.current || !$state.current.title) {
                return '';
            }
            var menuName = route.title;
            return $state.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
        }
    }
})();
