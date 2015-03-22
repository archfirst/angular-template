(function () {

    'use strict';

    angular.module('app.dashboard')
        .directive('dashboard', dashboardDirective)
        .controller('DashboardController', DashboardController);


    // ----- dashboardDirective -----
    dashboardDirective.$inject = [];

    /* @ngInject */
    function dashboardDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm',
            bindToController: true
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
