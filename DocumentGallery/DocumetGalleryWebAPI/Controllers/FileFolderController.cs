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
    public class FileFolderController : ApiController
    {
        [Route("api/FileFolder/GetAllDocumentFolder")]
        [HttpGet]
        [ActionName("UpdateFileFolder")]
        public long UpdateFileFolder(long id,string name, string type, string action,long? status_Id)
        {
            FileFolder objFileFolder = new FileFolder();
            return objFileFolder.UpdateFileFolder(id,name, type, action,status_Id);
        }
        [Route("api/FileFolder/GetDocumentFolderDetails")]
        [HttpGet]
        [ActionName("GetDocumentFolderDetails")]
        public List<DocumentFolderEntity> GetDocumentFolderDetails(long id, string type)
        {
            DocumentFolder objFileFolder = new DocumentFolder();
            return objFileFolder.GetDocumentFolderDetails(id, type);
        }
    }
}
