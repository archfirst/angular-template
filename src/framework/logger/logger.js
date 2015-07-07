(function() {
    'use strict';

    angular
        .module('fw.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];

    /* @ngInject */
    function logger($log, toastr) {
        var service = {
            log     : log,
            info    : info,
            success : success,
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
            toastr.info(message, 'Information');
            $log.info('info: ' + message);
        }

        function success(message) {
            toastr.success(message, 'Success');
            $log.info('success: ' + message);
        }

        function warn(message) {
            toastr.warning(message, 'Warning');
            $log.warn('warn: ' + message);
        }

        function error(message) {
            toastr.error(message, 'Error');
            $log.error('error: ' + message);
        }

        function debug(message) {
            $log.debug('debug: ' + message);
        }
    }
}());
