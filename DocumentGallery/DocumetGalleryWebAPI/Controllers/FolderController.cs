using DocumentGalleryBL;
using DocumentGalleryEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DocumetGalleryWebAPI.Controllers
{
    public class FolderController : ApiController
    {
        [HttpGet]
        [ActionName("Get")]
        public void test() {
            DocumentFolder obj = new DocumentFolder();
            obj.testDB();
        }
        [Route("api/Folder/GetAllDocumentFolder")]
        [HttpGet]
        [ActionName("GetAllDocumentFolder")]
        public List<DocumentFolderEntity> Get(long parent_Id)
        {
            DocumentFolder objDocumentFolder = new DocumentFolder();
            List<DocumentFolderEntity> result = objDocumentFolder.GetAllDocumentFolder(parent_Id);
            return result;
        }
        [Route("api/Folder/GetAddressBarURL")]
        [HttpGet]
        [ActionName("GetAddressBarURL")]
        public List<DocumentFolderEntity>GetAddressBarURL(long folder_Id)
        {
            DocumentFolder objDocumentFolder = new DocumentFolder();
            List<DocumentFolderEntity> result = objDocumentFolder.GetAddressBarURL(folder_Id);
            return result;
        }


        [Route("api/Folder/UpdateDocumentFolder")]
        [HttpGet]
        [HttpPost]
        [ActionName("UpdateDocumentFolder")]
        public string UpdateDocumentFolder(long Id,string Name,long Status_Id,long Parent_Id) {
            DocumentFolder objDocumentFolder = new DocumentFolder();
            DocumentFolderEntity objData = new DocumentFolderEntity();
            objData.Id = Id;
            objData.Name = Name;
            objData.Status_Id = Status_Id;
            objData.Parent_Id = Parent_Id;
            string result = objDocumentFolder.updateDocumentFolder(objData);
            return result;
        }
    }
}
