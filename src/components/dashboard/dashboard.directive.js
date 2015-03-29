(function () {

    'use strict';

    angular.module('app.dashboard')
        .directive('tmplDashboard', dashboardDirective)
        .controller('DashboardController', DashboardController);


    // ----- dashboardDirective -----
    dashboardDirective.$inject = [];

    /* @ngInject */
    function dashboardDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- DashboardController -----
    DashboardController.$inject = ['logger'];

    /* @ngInject */
    function DashboardController(logger) {

        activate();

        function activate() {
            logger.info('Activated Dashboard View');
        }
    }

})();
