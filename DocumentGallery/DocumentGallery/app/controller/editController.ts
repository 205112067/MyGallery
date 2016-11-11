module DocumentGallery {
    export class EditController {
        objFile = new FileEntity();
        parent_Id: number;
        folderController: any;
        id: number;
        type: string;
        index: number;
        statusList: any;
        dataSet = new DocumentFolderEntity();

        static $inject = ['$stateParams', '$scope', '$mdDialog', 'items', 'DocumentFolderService', 'fileFolderService']
        constructor(
                private $stateParams: any,
                private $scope: ng.IScope,
                private $mdDialog: any,
                private items: any,
                private documentFolderService: DocumentFolderService,
                private fileFolderService: DocumentGallery.FileFolderService
        ) {
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
        getDetails(id:number,type:string) {
            var vm = this;
            vm.documentFolderService.getDocumentFolderDetails(vm.id, vm.type)
                .then((data => {
                    vm.dataSet.Name = data[0].Name;
                    vm.dataSet.Status_Id = data[0].Status_Id;
                }));
        }
        update() {
            var vm = this;
            var action = 'Update';
            vm.fileFolderService.updateFileFolder(vm.id, vm.dataSet.Name, vm.type, action, vm.dataSet.Status_Id)
                .then((data => {
                    vm.folderController.DisplayToast('success', 'updated successfully');
                    var statusName;
                    for (var i = 0; i < vm.statusList.length; i++) {
                        if (vm.statusList[i].Id == vm.dataSet.Status_Id)
                        {
                            statusName = vm.statusList[i].Name;
                        }
                    }
                    vm.folderController.DocumentFolderList[vm.index].Status_Name = statusName;
                    vm.folderController.DocumentFolderList[vm.index].Name = vm.dataSet.Name;

                    vm.folderController.CloseDialog();
                }));
        }
    }
    angular.module('app').controller('editController', EditController);

}