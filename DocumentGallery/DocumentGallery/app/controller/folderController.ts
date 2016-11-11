module DocumentGallery {
    export class FolderController {
        parent_Id: number;
        documentFolderController: any;
        objFolder = new DocumentFolderEntity();
        static $inject = ['$stateParams', '$scope', '$mdDialog', 'items','DocumentFolderService']
        constructor(
            private $stateParams: any,
            private $scope: ng.IScope,
            private $mdDialog: any,
            private items: any,
            private documentFolderService:DocumentFolderService) {
            var vm = this;
            this.parent_Id = $stateParams.parent_Id;
            this.objFolder.Name = "New Folder";
            this.objFolder.Parent_Id = this.parent_Id;
            this.documentFolderController = vm.items.documentFolderController;
        }
        public CloseDialog() {
            this.$mdDialog.hide();
        }
        public updateDocumentFolder() {
            var vm = this;
            vm.objFolder.Status_Id = 1;
            vm.objFolder.Id = 0;
            vm.documentFolderService
                .updateDocumentFolder(vm.objFolder)
                .then((data) => {
                    this.documentFolderController.CloseDialog();
                    this.documentFolderController.DisplayToast('success', data);
                    this.documentFolderController.getDocumetFolder(this.parent_Id);
                });
        }
    }
    angular.module('app').controller('FolderController', FolderController);
}