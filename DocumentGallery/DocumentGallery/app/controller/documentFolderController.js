var DocumentGallery;
(function (DocumentGallery) {
    var DocumentFolderController = (function () {
        function DocumentFolderController($localStorage, $state, isLoggedIn, $stateParams, $rootScope, $scope, $mdDialog, $mdToast, documentFolderService, statusService, fileService, $location, fileFolderService) {
            this.$localStorage = $localStorage;
            this.$state = $state;
            this.isLoggedIn = isLoggedIn;
            this.$stateParams = $stateParams;
            this.$rootScope = $rootScope;
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.$mdToast = $mdToast;
            this.documentFolderService = documentFolderService;
            this.statusService = statusService;
            this.fileService = fileService;
            this.$location = $location;
            this.fileFolderService = fileFolderService;
            this.objDocumentFolder = new DocumentGallery.DocumentFolderEntity();
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
            $scope['limitOptions'] = [5, 10, 15, 20, 50, 100];
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
        DocumentFolderController.prototype.CloseDialog = function () {
            this.$mdDialog.hide();
        };
        DocumentFolderController.prototype.DisplayToast = function (type, msg) {
            var vm = this;
            vm.$mdToast.show(vm.$mdToast.simple()
                .content(msg)
                .hideDelay(2000)
                .position('top right')
                .action('OK')
                .capsule(true)
                .theme(type + "-toast"));
        };
        DocumentFolderController.prototype.searchFolderFile = function () {
            var vm = this;
            debugger;
            if (vm.search.length) {
                vm.documentFolderService
                    .searchFolderFile(vm.search)
                    .then(function (data) {
                    vm.$rootScope['FolderList'] = data;
                });
            }
            else {
                vm.getDocumetFolder(0);
            }
        };
        DocumentFolderController.prototype.formatBytes = function (bytes, decimals) {
            if (bytes == 0)
                return '0 Byte';
            var k = 1024;
            var dm = decimals + 1 || 3;
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            var i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat(Math.ceil(bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        };
        DocumentFolderController.prototype.delete = function (folderFile, action) {
            var vm = this;
            var type;
            if (folderFile.Type == 'FileFolder') {
                type = 'FileFolder';
            }
            else {
                type = 'File';
            }
            vm.fileFolderService.updateFileFolder(folderFile.Id, null, type, action, null)
                .then(function (data) {
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
        };
        DocumentFolderController.prototype.getDocumetFolder = function (parent_Id) {
            var _this = this;
            var vm = this;
            vm.documentFolderService
                .getDocumentFolderList(parent_Id)
                .then(function (data) {
                debugger;
                vm.DocumentFolderList = data;
                vm.$rootScope['FolderList'] = data;
                vm.getAddressBarURL(parent_Id);
                for (var i = 0; i < _this.DocumentFolderList.length; i++) {
                    var newSize;
                    if (_this.DocumentFolderList[i].Size)
                        _this.DocumentFolderList[i].Size = _this.formatBytes(_this.DocumentFolderList[i].Size, 0);
                }
            });
        };
        DocumentFolderController.prototype.getAddressBarURL = function (folder_Id) {
            var vm = this;
            vm.documentFolderService
                .getAddressBarURL(folder_Id)
                .then(function (data) {
                vm.AddressBarList = data;
                console.log(vm.AddressBarList);
                vm.$rootScope['AddressBarURL'] = data;
            });
        };
        DocumentFolderController.prototype.getStatusList = function () {
            var vm = this;
            vm.statusService
                .getStatusList()
                .then(function (data) {
                vm.StatusList = data;
            });
        };
        DocumentFolderController.prototype.updateDocumentFolder = function () {
            var vm = this;
            vm.documentFolderService
                .updateDocumentFolder(vm.objDocumentFolder)
                .then(function (data) {
                vm.DisplayToast('success', data);
                vm.CloseDialog();
                vm.getDocumetFolder(vm.objDocumentFolder.Parent_Id);
            });
        };
        DocumentFolderController.prototype.downloadFile = function (file_Id) {
            debugger;
            var vm = this;
            vm.fileService.downloadFile(file_Id);
        };
        DocumentFolderController.prototype.addNewFolder = function ($event) {
            debugger;
            var vm = this;
            var parentEl = angular.element(document.body);
            this.$mdDialog.show({
                templateUrl: "app/template/addNewFolderDialog.html",
                controller: DocumentGallery.FolderController,
                controllerAs: "folderController",
                clickOutsideToClose: true,
                targetEvent: $event,
                parent: parentEl,
                items: {
                    documentFolderController: this
                }
            });
        };
        DocumentFolderController.prototype.update = function ($event, id, type, index) {
            var vm = this;
            debugger;
            var parentEl = angular.element(document.body);
            this.$mdDialog.show({
                templateUrl: "app/template/editDialog.html",
                controller: DocumentGallery.EditController,
                controllerAs: "editCtrl",
                clickOutsideToClose: true,
                targetEvent: $event,
                parent: parentEl,
                items: {
                    id: id,
                    type: type,
                    index: index,
                    statusList: vm.StatusList,
                    documentFolderController: this
                }
            });
        };
        DocumentFolderController.prototype.addNewFile = function ($event) {
            var vm = this;
            debugger;
            var parentEl = angular.element(document.body);
            this.$mdDialog.show({
                templateUrl: "app/template/addNewFileDialog.html",
                controller: DocumentGallery.FileController,
                controllerAs: "fileController",
                clickOutsideToClose: true,
                targetEvent: $event,
                parent: parentEl,
                items: {
                    documentFolderController: this
                }
            });
        };
        DocumentFolderController.$inject = ['$localStorage', '$state', 'isLoggedIn', '$stateParams', '$rootScope', '$scope', '$mdDialog', '$mdToast', 'DocumentFolderService', 'StatusService', 'FileService', '$location', 'fileFolderService'];
        return DocumentFolderController;
    }());
    DocumentGallery.DocumentFolderController = DocumentFolderController;
    angular.module('app').controller('DocumentFolderController', DocumentGallery.DocumentFolderController);
})(DocumentGallery || (DocumentGallery = {}));
//# sourceMappingURL=documentFolderController.js.map