var DocumentGallery;
(function (DocumentGallery) {
    var DocumentFolderService = (function () {
        function DocumentFolderService(BaseUrl, $http, $q) {
            this.BaseUrl = BaseUrl;
            this.$http = $http;
            this.$q = $q;
        }
        DocumentFolderService.prototype.getDocumentFolderDetails = function (id, type) {
            var vm = this;
            var params;
            params = 'FileFolder/GetDocumentFolderDetails?id=' + id + '&type=' + type;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data, status) {
                deferred.resolve(data);
                vm.DocumentFolderList = data;
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        };
        DocumentFolderService.prototype.getDocumentFolderList = function (parent_Id) {
            var vm = this;
            var params;
            params = 'Folder/GetAllDocumentFolder?parent_Id=' + parent_Id;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data, status) {
                deferred.resolve(data);
                vm.DocumentFolderList = data;
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        };
        DocumentFolderService.prototype.searchFolderFile = function (search) {
            var vm = this;
            var params;
            params = 'Search/GetSearchResult?search=' + search;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data, status) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        };
        DocumentFolderService.prototype.getAddressBarURL = function (folder_Id) {
            var vm = this;
            var params;
            params = 'Folder/GetAddressBarURL?folder_Id=' + folder_Id;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data, status) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        };
        DocumentFolderService.prototype.updateDocumentFolder = function (objDocumentFolder) {
            var vm = this;
            var params;
            params = 'Folder/UpdateDocumentFolder?Id=' + objDocumentFolder.Id + '&Name=' + objDocumentFolder.Name + '&Status_Id=' + objDocumentFolder.Status_Id + '&Parent_Id=' + objDocumentFolder.Parent_Id;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data, status) {
                deferred.resolve(data);
                vm.DocumentFolderList = data;
            }).error(function () {
                deferred.reject();
            });
            return deferred.promise;
        };
        DocumentFolderService.$inject = ['BaseUrl', '$http', '$q'];
        return DocumentFolderService;
    }());
    DocumentGallery.DocumentFolderService = DocumentFolderService;
    angular.module('app').service('DocumentFolderService', DocumentGallery.DocumentFolderService);
})(DocumentGallery || (DocumentGallery = {}));
