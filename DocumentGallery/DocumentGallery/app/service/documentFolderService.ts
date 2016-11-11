module DocumentGallery {
    export class DocumentFolderService {
        DocumentFolderList: any;
        static $inject = ['BaseUrl', '$http', '$q']
        constructor(private BaseUrl: any,
            private $http: ng.IHttpService,
            private $q
        ) {

        }
        public getDocumentFolderDetails(id: number, type: string) {
            var vm = this;
            var params: string;
            params = 'FileFolder/GetDocumentFolderDetails?id=' + id + '&type=' + type;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data: any, status: any) {
                    deferred.resolve(data);
                    vm.DocumentFolderList = data;
                }).error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }
        public getDocumentFolderList(parent_Id: number) {
            var vm = this;
            var params: string;
            params = 'Folder/GetAllDocumentFolder?parent_Id=' + parent_Id;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data: any, status: any) {
                    deferred.resolve(data);
                    vm.DocumentFolderList = data;
                }).error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }
        public searchFolderFile(search: string) {
            var vm = this;
            var params: string;
            params = 'Search/GetSearchResult?search=' + search;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data: any, status: any) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }
        public getAddressBarURL(folder_Id: number) {
            var vm = this;
            var params: string;
            params = 'Folder/GetAddressBarURL?folder_Id=' + folder_Id;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data: any, status: any) {
                    deferred.resolve(data);
                }).error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }

        public updateDocumentFolder(objDocumentFolder: DocumentFolderEntity) {
            var vm = this;
            var params: string;
            params = 'Folder/UpdateDocumentFolder?Id=' + objDocumentFolder.Id + '&Name=' + objDocumentFolder.Name + '&Status_Id=' + objDocumentFolder.Status_Id + '&Parent_Id=' + objDocumentFolder.Parent_Id;
            var deferred = this.$q.defer();
            this.$http.get(this.BaseUrl + params)
                .success(function (data: any, status: any) {
                    deferred.resolve(data);
                    vm.DocumentFolderList = data;
                }).error(function () {
                    deferred.reject();
                });
            return deferred.promise;
        }
    }
    angular.module('app').service('DocumentFolderService', DocumentGallery.DocumentFolderService);



}