(function () {
    'use strict';

    angular
        .module('app.topnav')
        .directive('tmplTopnav', topnavDirective)
        .controller('TopnavController', TopnavController);


    // ----- topnavDirective -----
    topnavDirective.$inject = [];

    /* @ngInject */
    function topnavDirective() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/topnav/topnav.html',
            controller: 'TopnavController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- TopnavController -----
    TopnavController.$inject = [];

    /* @ngInject */
    function TopnavController() {
        var vm = this;
        vm.isCollapsed = true;
    }

})();
