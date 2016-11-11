module DocumentGallery {
    export class DocumentFolderController {
        public DocumentFolderList: any;
        public AddressBarList: any;
        public StatusList: any;
        public search: string;
        public objDocumentFolder = new DocumentFolderEntity();
        public isOpen: boolean;
        public selectedMode: string;
        public selectedDirection: string;
        public fileData: any;
        static $inject = ['$localStorage', '$state', 'isLoggedIn', '$stateParams', '$rootScope', '$scope', '$mdDialog', '$mdToast', 'DocumentFolderService', 'StatusService', 'FileService', '$location','fileFolderService'];
        constructor(
            private $localStorage: WindowLocalStorage,
            private $state: any,
            private isLoggedIn: any,
            private $stateParams: any,
            private $rootScope: ng.IRootScopeService,
            private $scope: ng.IScope,
            private $mdDialog: any,
            private $mdToast: any,
            private documentFolderService: DocumentGallery.DocumentFolderService,
            private statusService: DocumentGallery.StatusService,
            private fileService: FileService,
            private $location: any,
            private fileFolderService :DocumentGallery.FileFolderService) {
            var vm = this;
            vm.$rootScope["showLogout"] = vm.$localStorage["isUserLoggedIn"];
            vm.$rootScope["username"] = vm.$localStorage["userName"];
            if (!vm.$localStorage["isUserLoggedIn"] || isLoggedIn == undefined) {
                $state.go('login');
            }
            vm.objDocumentFolder.Id = 0;
            vm.objDocumentFolder.Status_Id = 1;
            vm.objDocumentFolder.Parent_Id = $stateParams.parent_Id;
            vm.$rootScope.$on('$locationChangeSuccess', function () {
                vm.isOpen = false;
                vm.selectedMode = 'md-fling';
                vm.selectedDirection = 'up';
            });

            $scope['count'] = 10;

            $scope['limitOptions'] = [5, 10, 15, 20,50,100];

            $scope['options'] = {
                boundaryLinks: true,
                limitSelect: true,
                multiSelect: true,
                pageSelect: true
            };

            $scope['query'] = {
                order: 'name',
                limit: 50,
                page: 1
            };

            $scope['toggleLimitOptions'] = function () {
                $scope['limitOptions'] = $scope['limitOptions'] ? undefined : [5, 10, 15];
            };
            $rootScope.$watch("FolderList", function (newValue, oldValue) {
                if (newValue !== undefined) {
                    vm.DocumentFolderList = newValue;
                }
            });
            $rootScope.$watch("AddressBarURL", function (newValue, oldValue) {
                if (newValue !== undefined) {
                    vm.AddressBarList = newValue;
                }
            });

            vm.getDocumetFolder(vm.objDocumentFolder.Parent_Id);
            vm.getStatusList();
        }
        public CloseDialog() {
            this.$mdDialog.hide();
        }
        public DisplayToast(type, msg) {
            var vm = this;
            vm.$mdToast.show(
                vm.$mdToast.simple()
                    .content(msg)
                    .hideDelay(2000)
                    .position('top right')
                    .action('OK')
                    .capsule(true)
                    .theme(type + "-toast"));
        }
        public searchFolderFile() {
            var vm = this;
            debugger;
            if (vm.search.length) {
                vm.documentFolderService
                    .searchFolderFile(vm.search)
                    .then((data) => {
                        vm.$rootScope['FolderList'] = data;
                    });
            }
            else {
                vm.getDocumetFolder(0);
            }
        }

        public formatBytes(bytes, decimals) {
            if (bytes == 0) return '0 Byte';
            var k = 1024;
            var dm = decimals + 1 || 3;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat(Math.ceil(bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        }

        public delete(folderFile: any,action:string) {
            var vm = this;
            var type: string;
            if (folderFile.Type == 'FileFolder') {
                type = 'FileFolder';
            }
            else {
                type = 'File';
            }
            vm.fileFolderService.updateFileFolder(folderFile.Id,null, type, action,null)
                .then((data) => {
                    if (data == folderFile.Id) {
                        for (var i = 0; i < vm.DocumentFolderList.length; i++) {
                            if (vm.DocumentFolderList[i].Id == folderFile.Id) {
                                vm.DocumentFolderList.splice(i, 1);
                                break;
                            }
                            vm.DisplayToast('success', 'deleted Successfully');
                        }
                    }
                    else {
                        vm.DisplayToast('error', 'something went wrong....!!');

                    }
                });


            
        }
        public getDocumetFolder(parent_Id: number) {
            var vm = this;

            vm.documentFolderService
                .getDocumentFolderList(parent_Id)
                .then((data) => {
                    debugger;
                    vm.DocumentFolderList = data;
                    vm.$rootScope['FolderList'] = data;
                    vm.getAddressBarURL(parent_Id);
                    for (var i = 0; i < this.DocumentFolderList.length; i++) {
                        var newSize: any;
                        if (this.DocumentFolderList[i].Size)
                            this.DocumentFolderList[i].Size = this.formatBytes(this.DocumentFolderList[i].Size, 0);
                    }
                });
        }
        public getAddressBarURL(folder_Id: number) {
            var vm = this;
            vm.documentFolderService
                .getAddressBarURL(folder_Id)
                .then((data) => {
                    vm.AddressBarList = data;
                    console.log(vm.AddressBarList);
                    vm.$rootScope['AddressBarURL'] = data;
                });
        }
        public getStatusList() {
            var vm = this;
            vm.statusService
                .getStatusList()
                .then((data) => {
                    vm.StatusList = data;
                });
        }

        public updateDocumentFolder() {
            var vm = this;
            vm.documentFolderService
                .updateDocumentFolder(vm.objDocumentFolder)
                .then((data) => {
                    vm.DisplayToast('success', data);
                    vm.CloseDialog();
                    vm.getDocumetFolder(vm.objDocumentFolder.Parent_Id);
                });
        }
        public downloadFile(file_Id: number) {
            debugger;
            var vm = this;
            vm.fileService.downloadFile(file_Id);
        }

        public addNewFolder($event: any) {
            debugger;
            var vm = this;
            var parentEl = angular.element(document.body);
            this.$mdDialog.show({
                templateUrl: "app/template/addNewFolderDialog.html",
                controller: FolderController,
                controllerAs: "folderController",
                clickOutsideToClose: true,
                targetEvent: $event,
                parent: parentEl,
                items: {
                    
                    documentFolderController: this
                }
            });
        }
        public update($event: any, id: number, type: string, index: number) {
            var vm = this;
            debugger;
            var parentEl = angular.element(document.body);
            this.$mdDialog.show({
                templateUrl: "app/template/editDialog.html",
                controller: EditController,
                controllerAs: "editCtrl",
                clickOutsideToClose: true,
                targetEvent: $event,
                parent: parentEl,
                items: {
                    id: id,
                    type: type,
                    index:index,
                    statusList: vm.StatusList,
                    documentFolderController: this
                }
            });
        }
        public addNewFile($event: any) {
            var vm = this;
            debugger;
            var parentEl = angular.element(document.body);
            this.$mdDialog.show({
                templateUrl: "app/template/addNewFileDialog.html",
                controller: FileController,
                controllerAs: "fileController",
                clickOutsideToClose: true,
                targetEvent: $event,
                parent: parentEl,
                items: {
                    documentFolderController: this
                }
            });
        }

    }
    angular.module('app').controller('DocumentFolderController', DocumentGallery.DocumentFolderController);
}