module DocumentGallery {
    export class FileService {
     
        static $inject = ['$http', '$q', 'BaseUrl','$window'];

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private BaseUrl: any,
            private $window:ng.IWindowService) {
            
        }
        public downloadFile(file_Id: number) {
            var vm = this;
            var url: string;
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
        }
        public updateFile(fd: FormData) {
            var vm = this;
            var url: string;
            url = this.BaseUrl+ 'File/UpdateFile';
            //    params = 'Folder/UpdateDocumentFolder?Id=' + objDocumentFolder.Id + '&Name=' + objDocumentFolder.Name + '&Status_Id=' + objDocumentFolder.Status_Id + '&Parent_Id=' + objDocumentFolder.Parent_Id;
            var deferred = this.$q.defer();
            vm.$http.post(url, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function (data: any) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    console.log("error in uploading..." + data)
                })


            return deferred.promise;

        }
    }

    angular.module('app').service("FileService", FileService);
}