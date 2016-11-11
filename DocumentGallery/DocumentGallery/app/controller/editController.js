var DocumentGallery;
(function (DocumentGallery) {
    var EditController = (function () {
        function EditController($stateParams, $scope, $mdDialog, items, documentFolderService, fileFolderService) {
            this.$stateParams = $stateParams;
            this.$scope = $scope;
            this.$mdDialog = $mdDialog;
            this.items = items;
            this.documentFolderService = documentFolderService;
            this.fileFolderService = fileFolderService;
            this.objFile = new DocumentGallery.FileEntity();
            this.dataSet = new DocumentGallery.DocumentFolderEntity();
            var vm = this;
            this.parent_Id = $stateParams.parent_Id;
            this.id = items.id;
            this.index = items.index;
            this.type = items.type;
            this.statusList = items.statusList;
            console.log(this.statusList);
            this.folderController = vm.items.documentFolderController;
            this.getDetails(this.id, this.type);
        }
        EditController.prototype.getDetails = function (id, type) {
            var vm = this;
            vm.documentFolderService.getDocumentFolderDetails(vm.id, vm.type)
                .then((function (data) {
                vm.dataSet.Name = data[0].Name;
                vm.dataSet.Status_Id = data[0].Status_Id;
            }));
        };
        EditController.prototype.update = function () {
            var vm = this;
            var action = 'Update';
            vm.fileFolderService.updateFileFolder(vm.id, vm.dataSet.Name, vm.type, action, vm.dataSet.Status_Id)
                .then((function (data) {
                vm.folderController.DisplayToast('success', 'updated successfully');
                var statusName;
                for (var i = 0; i < vm.statusList.length; i++) {
                    if (vm.statusList[i].Id == vm.dataSet.Status_Id) {
                        statusName = vm.statusList[i].Name;
                    }
                }
                vm.folderController.DocumentFolderList[vm.index].Status_Name = statusName;
                vm.folderController.DocumentFolderList[vm.index].Name = vm.dataSet.Name;
                vm.folderController.CloseDialog();
            }));
        };
        EditController.$inject = ['$stateParams', '$scope', '$mdDialog', 'items', 'DocumentFolderService', 'fileFolderService'];
        return EditController;
    }());
    DocumentGallery.EditController = EditController;
    angular.module('app').controller('editController', EditController);
})(DocumentGallery || (DocumentGallery = {}));
