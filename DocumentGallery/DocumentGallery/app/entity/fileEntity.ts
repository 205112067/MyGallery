module DocumentGallery {
    export class FileEntity {
        Id: number;
        Name: string;
        File: File;
        Size: number;
        Parent_Id: number;
        Type: string;
        Status_Id: number;
        constructor() { }
    }
}