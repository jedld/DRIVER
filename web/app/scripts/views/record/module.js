(function () {
    'use strict';

    /* ngInject */
    function StateConfig($stateProvider) {
        $stateProvider.state('record', {
            abstract: true,
            url: '/record',
            template: '<ui-view></ui-view>'
        });
        $stateProvider.state('record.add', {
            url: '/:rtuuid/add',
            template: '<driver-record-add></driver-record-add>'
        });
        $stateProvider.state('record.edit', {
            url: '/:rtuuid/edit/:uuid',
            template: '<driver-record-edit></driver-record-edit>'
        });
    }

    angular.module('driver.views.record', [
        'ase.notifications',
        'ase.resources',
        'ase.schemas',
        'driver.config',
        'driver.resources',
        'json-editor',
        'ui.bootstrap',
        'ui.router',
        'uuid'
    ]).config(StateConfig);

})();