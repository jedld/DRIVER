'use strict';

describe('ase.resources: RecordSchemas', function () {

    beforeEach(module('ase.resources'));
    beforeEach(module('ase.mock.resources'));

    var $httpBackend;
    var RecordSchemas;
    var ResourcesMock;

    beforeEach(inject(function (_$httpBackend_, _RecordSchemas_, _ResourcesMock_) {
        $httpBackend = _$httpBackend_;
        RecordSchemas = _RecordSchemas_;
        ResourcesMock = _ResourcesMock_;
    }));

    it('should extract record schemas from paginated response', function () {
        var requestUrl = /\/api\/recordschemas/;
        $httpBackend.whenGET(requestUrl).respond(ResourcesMock.RecordSchemaResponse);
        RecordSchemas.query().$promise.then(function (data) {
            expect(data.length).toBe(1);
            var firearms = data[0].schema.definitions.Firearm;
            expect(firearms.title).toBe('Firearm');
            /* jshint camelcase: false */
            expect(firearms.plural_title).toBe('Firearms');
            /* jshint camelcase: true */
            expect(firearms.description).toBe('Guns and other projectiles.');
        });
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
