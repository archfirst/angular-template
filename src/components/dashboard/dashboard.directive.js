(function () {

    'use strict';

    angular.module('app.dashboard')
        .directive('dashboard', function () {

            return {
                restrict: 'E',
                templateUrl: 'components/dashboard/dashboard.html',
                controller: DashboardController,
                controllerAs: 'vm',
                bindToController: true
            };
        });


    DashboardController.$inject = ['logger'];

    /* @ngInject */
    function DashboardController(logger) {

        activate();

        function activate() {
            logger.info('Activated Dashboard View');
        }
    }

})();
