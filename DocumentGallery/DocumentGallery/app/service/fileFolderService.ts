module DocumentGallery {
    export class FileFolderService {
        static $inject = ['$http', '$q', 'BaseUrl', '$window'];

        constructor(private $http: ng.IHttpService,
            private $q: ng.IQService,
            private BaseUrl: any,
            private $window: ng.IWindowService) {

        }
        public updateFileFolder(id: number,name:string, type: string, action: string,status_Id:number) {
            var vm = this;
            var params: string;
            params = 'FileFolder/GetAllDocumentFolder?id=' + id +'&name='+name+ '&type=' + type + '&action=' + action +'&status_Id='+status_Id;
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
    angular.module('app').service('fileFolderService', DocumentGallery.FileFolderService);
}

