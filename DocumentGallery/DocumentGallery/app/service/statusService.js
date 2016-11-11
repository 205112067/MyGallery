var DocumentGallery;
(function (DocumentGallery) {
    'use strict';
    var StatusService = (function () {
        function StatusService(BaseUrl, $http, $q) {
            this.BaseUrl = BaseUrl;
            this.$http = $http;
            this.$q = $q;
        }
        StatusService.prototype.getStatusList = function () {
            var vm = this;
            var params;
            params = 'Status/GetAllStatus';
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data, status) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        };
        StatusService.$inject = ['BaseUrl', '$http', '$q'];
        return StatusService;
    }());
    DocumentGallery.StatusService = StatusService;
    angular.module('app').service('StatusService', DocumentGallery.StatusService);
})(DocumentGallery || (DocumentGallery = {}));
//# sourceMappingURL=statusService.js.map