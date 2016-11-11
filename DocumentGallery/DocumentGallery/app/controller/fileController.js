var DocumentGallery;
(function (DocumentGallery) {
    'use strict';
    var FileController = (function () {
        function FileController($stateParams, $scope, $mdDialog, statusService, fileService, items) {
            this.$stateParams = $stateParams;
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.statusService = statusService;
            this.fileService = fileService;
            this.items = items;
            this.objFile = new DocumentGallery.FileEntity();
            var vm = this;
            this.parent_Id = $stateParams.parent_Id;
            this.documentFolderController = vm.items.documentFolderController;
            vm.getStatusList();
        }
        FileController.prototype.CloseDialog = function () {
            this.$mdDialog.hide();
        };
        FileController.prototype.SetFileName = function () {
            debugger;
            var endIndex;
            endIndex = this.$scope["files"][0].lfFile.name.indexOf('.');
            this.objFile.Name = this.$scope["files"][0].lfFile.name.substr(0, endIndex);
        };
        FileController.prototype.updateFile = function () {
            var _this = this;
            debugger;
            var startIndex;
            this.objFile.Id = null;
            this.objFile.Parent_Id = this.$stateParams.parent_Id;
            this.objFile.Size = this.$scope["files"][0].lfFile.size;
            startIndex = this.$scope["files"][0].lfFile.name.indexOf('.');
            this.objFile.Type = this.$scope["files"][0].lfFile.name.substr(startIndex + 1); //"jpg";
            console.log(this.objFile);
            var formData = new FormData();
            angular.forEach(this.$scope["files"], function (obj) {
                formData.append('files[]', obj.lfFile);
            });
            formData.append('objFile', JSON.stringify(this.objFile));
            this.fileService.updateFile(formData)
                .then(function (data) {
                _this.documentFolderController.CloseDialog();
                _this.documentFolderController.DisplayToast('success', data);
                _this.documentFolderController.getDocumetFolder(_this.parent_Id);
            });
        };
        FileController.prototype.getStatusList = function () {
            var vm = this;
            vm.statusService
                .getStatusList()
                .then(function (data) {
                vm.StatusList = data;
                vm.objFile.Status_Id = vm.StatusList[0].Id;
            });
        };
        FileController.$inject = ['$stateParams', '$scope', '$mdDialog', 'StatusService', 'FileService', 'items'];
        return FileController;
    }());
    DocumentGallery.FileController = FileController;
    angular.module('app').controller('FileController', DocumentGallery.FileController);
})(DocumentGallery || (DocumentGallery = {}));
//# sourceMappingURL=fileController.js.map