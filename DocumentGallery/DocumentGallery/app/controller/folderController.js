var DocumentGallery;
(function (DocumentGallery) {
    var FolderController = (function () {
        function FolderController($stateParams, $scope, $mdDialog, items, documentFolderService) {
            this.$stateParams = $stateParams;
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.items = items;
            this.documentFolderService = documentFolderService;
            this.objFolder = new DocumentGallery.DocumentFolderEntity();
            var vm = this;
            this.parent_Id = $stateParams.parent_Id;
            this.objFolder.Name = "New Folder";
            this.objFolder.Parent_Id = this.parent_Id;
            this.documentFolderController = vm.items.documentFolderController;
        }
        FolderController.prototype.CloseDialog = function () {
            this.$mdDialog.hide();
        };
        FolderController.prototype.updateDocumentFolder = function () {
            var _this = this;
            var vm = this;
            vm.objFolder.Status_Id = 1;
            vm.objFolder.Id = 0;
            vm.documentFolderService
                .updateDocumentFolder(vm.objFolder)
                .then(function (data) {
                _this.documentFolderController.CloseDialog();
                _this.documentFolderController.DisplayToast('success', data);
                _this.documentFolderController.getDocumetFolder(_this.parent_Id);
            });
        };
        FolderController.$inject = ['$stateParams', '$scope', '$mdDialog', 'items', 'DocumentFolderService'];
        return FolderController;
    }());
    DocumentGallery.FolderController = FolderController;
    angular.module('app').controller('FolderController', FolderController);
})(DocumentGallery || (DocumentGallery = {}));
