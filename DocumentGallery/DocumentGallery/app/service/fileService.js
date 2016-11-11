var DocumentGallery;
(function (DocumentGallery) {
    var FileService = (function () {
        function FileService($http, $q, BaseUrl, $window) {
            this.$http = $http;
            this.$q = $q;
            this.BaseUrl = BaseUrl;
            this.$window = $window;
        }
        FileService.prototype.downloadFile = function (file_Id) {
            var vm = this;
            var url;
            url = this.BaseUrl + 'File/DownloadFile?file_Id=' + file_Id;
            this.$window.location.href = url;
            //var deferred = this.$q.defer();
            //this.$http.get(url)
            //    .success(function (data: any, status: any) {
            //        deferred.resolve(data);
            //    }).error(function () {
            //        deferred.reject();
            //    });
            //return deferred.promise;
        };
        FileService.prototype.updateFile = function (fd) {
            var vm = this;
            var url;
            url = this.BaseUrl + 'File/UpdateFile';
            //    params = 'Folder/UpdateDocumentFolder?Id=' + objDocumentFolder.Id + '&Name=' + objDocumentFolder.Name + '&Status_Id=' + objDocumentFolder.Status_Id + '&Parent_Id=' + objDocumentFolder.Parent_Id;
            var deferred = this.$q.defer();
            vm.$http.post(url, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function (data) {
                deferred.resolve(data);
            })
                .error(function (data) {
                console.log("error in uploading..." + data);
            });
            return deferred.promise;
        };
        FileService.$inject = ['$http', '$q', 'BaseUrl', '$window'];
        return FileService;
    }());
    DocumentGallery.FileService = FileService;
    angular.module('app').service("FileService", FileService);
})(DocumentGallery || (DocumentGallery = {}));
//# sourceMappingURL=fileService.js.map