(function () {
    'use strict';

    /* ngInject */
    function RTAddController($log, $scope, $state, RecordSchemas, RecordTypes, Schemas) {
        var ctl = this;
        initialize();

        function initialize() {
            ctl.recordType = {};
            ctl.submitForm = submitForm;
        }

        /*
         * Creates the record type and switches to the list view on success
         */
        function submitForm() {
            RecordTypes.create(ctl.recordType, onRecordTypeCreateSuccess, function(error) {
                $log.debug('Error while adding recordType: ', error);
            });
        }

        /**
         * Create blank associated record schema v1 on record type create success
         * @return {[type]} [description]
         */
        function onRecordTypeCreateSuccess(recordType) {
            $scope.$emit('ase.recordtypes.changed');
            RecordSchemas.create({
                /* jshint camelcase: false */
                record_type: recordType.uuid,
                schema: Schemas.JsonObject()
                /* jshint camelcase: true */
            }).$promise.then(function () {
                $state.go('rt.list');
            }, function (error) {
                $log.debug('Error while creating recordschema:', error);
            });
        }
    }

    angular.module('ase.views.recordtype')
    .controller('RTAddController', RTAddController);
})();