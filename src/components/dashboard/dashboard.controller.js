(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['logger'];

    /* @ngInject */
    function DashboardController(logger) {

        activate();

        function activate() {
            logger.info('Activated Dashboard View');
        }
    }
})();
