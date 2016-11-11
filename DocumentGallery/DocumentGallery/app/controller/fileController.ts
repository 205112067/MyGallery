module DocumentGallery {
    'use strict'
    export class FileController {
        objFile = new FileEntity();
        parent_Id: number;
        documentFolderController: any;
        public StatusList: any;

        static $inject = ['$stateParams', '$scope', '$mdDialog', 'StatusService', 'FileService','items']
        constructor(
            private $stateParams: any,
            private $scope: ng.IScope,
            private $mdDialog: any,
            private statusService: DocumentGallery.StatusService,
            private fileService: DocumentGallery.FileService,
            private items: any) {
            var vm = this;
            this.parent_Id = $stateParams.parent_Id;
            this.documentFolderController = vm.items.documentFolderController;
            vm.getStatusList();
           
        }

        public CloseDialog() {
            this.$mdDialog.hide();
        }
        public SetFileName() {
            debugger;
            var endIndex: number;
            endIndex = this.$scope["files"][0].lfFile.name.indexOf('.');

            this.objFile.Name = this.$scope["files"][0].lfFile.name.substr(0,endIndex);
        }
        public updateFile() {
            debugger;
            var  startIndex: number;
            this.objFile.Id = null;
            this.objFile.Parent_Id = this.$stateParams.parent_Id;
            this.objFile.Size = this.$scope["files"][0].lfFile.size;
            startIndex = this.$scope["files"][0].lfFile.name.indexOf('.');
            this.objFile.Type = this.$scope["files"][0].lfFile.name.substr(startIndex+1);//"jpg";
            console.log(this.objFile);
            var formData = new FormData();
            angular.forEach(this.$scope["files"], function (obj) {
                formData.append('files[]', obj.lfFile);
            });
            formData.append('objFile', JSON.stringify(this.objFile));
            this.fileService.updateFile(formData)
                .then((data) => {
                    this.documentFolderController.CloseDialog();
                    this.documentFolderController.DisplayToast('success', data);
                    this.documentFolderController.getDocumetFolder(this.parent_Id);

                });
        }
        public getStatusList() {
            var vm = this;
            vm.statusService
                .getStatusList()
                .then((data) => {
                    vm.StatusList = data;
                    vm.objFile.Status_Id = vm.StatusList[0].Id;
                });
        }
    }


    angular.module('app').controller('FileController', DocumentGallery.FileController);

}