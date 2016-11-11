module DocumentGallery {
     interface IDcoumentGalleryEntity {
         Id: number;
         Name: string;
         Status_Id: number;
         Status_Name: string;
         Type: string;
         Parent_Id: number;
         UpdatedOn: Date;
    }

    export class DocumentFolderEntity {
        public Id: number;
        public Name: string;
        public Status_Id: number;
        public Status_Name: string;
        public Type: string;
        public Parent_Id: number;
        public UpdatedOn: Date;

        constructor() { }
    }
}