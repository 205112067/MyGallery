var DocumentGallery;
(function (DocumentGallery) {
    var FileFolderService = (function () {
        function FileFolderService($http, $q, BaseUrl, $window) {
            this.$http = $http;
            this.$q = $q;
            this.BaseUrl = BaseUrl;
            this.$window = $window;
        }
        FileFolderService.prototype.updateFileFolder = function (id, name, type, action, status_Id) {
            var vm = this;
            var params;
            params = 'FileFolder/GetAllDocumentFolder?id=' + id + '&name=' + name + '&type=' + type + '&action=' + action + '&status_Id=' + status_Id;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data, status) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        };
        FileFolderService.$inject = ['$http', '$q', 'BaseUrl', '$window'];
        return FileFolderService;
    }());
    DocumentGallery.FileFolderService = FileFolderService;
    angular.module('app').service('fileFolderService', DocumentGallery.FileFolderService);
})(DocumentGallery || (DocumentGallery = {}));
