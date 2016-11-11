module DocumentGallery {
    'use strict'
    export class StatusService {
        static $inject = ['BaseUrl', '$http', '$q']
        constructor(private BaseUrl: any,
            private $http: ng.IHttpService,
            private $q
        ) {

        }
        public getStatusList() {
            var vm = this;
            var params: string;
            params = 'Status/GetAllStatus';
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data: any, status: any) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject();
                });
            return deferred.promise;

        }
    }
    angular.module('app').service('StatusService', DocumentGallery.StatusService);

}