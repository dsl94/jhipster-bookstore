(function() {
    'use strict';
    angular
        .module('bookstoreApp')
        .factory('Book', Book);

    Book.$inject = ['$resource', 'DateUtils'];

    function Book ($resource, DateUtils) {
        var resourceUrl =  'api/books/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.publishingDate = DateUtils.convertLocalDateFromServer(data.publishingDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.publishingDate = DateUtils.convertLocalDateToServer(copy.publishingDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.publishingDate = DateUtils.convertLocalDateToServer(copy.publishingDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
