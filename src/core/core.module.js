(function() {
    'use strict';

    angular.module('app.core', [
        // Angular modules
        'ngSanitize',

        // Our reusable framework
        'fw.exception', 'fw.logger',

        // 3rd Party modules
        'ui.bootstrap', 'ui.router'
    ]);
})();
