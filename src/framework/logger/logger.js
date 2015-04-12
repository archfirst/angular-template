(function() {
    'use strict';

    angular
        .module('fw.logger')
        .factory('logger', logger);

    logger.$inject = ['$log'];

    /* @ngInject */
    function logger($log) {
        var service = {
            log     : log,
            info    : info,
            warn    : warn,
            error   : error,
            debug   : debug
        };

        return service;
        /////////////////////

        function log(message) {
            $log.log('log: ' + message);
        }

        function info(message) {
            $log.info('info: ' + message);
        }

        function warn(message) {
            $log.warn('warn: ' + message);
        }

        function error(message) {
            $log.error('error: ' + message);
        }

        function debug(message) {
            $log.debug('debug: ' + message);
        }
    }
}());
