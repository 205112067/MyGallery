using DocumentGalleryBL;
using DocumentGalleryEntity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;


namespace DocumetGalleryWebAPI.Controllers
{
    public class FileController : ApiController
    {
        [Route("api/File/UpdateFile")]
        [HttpPost]
        [ActionName("UpdateFile")]
        public string UpdateFile()
        {
            string result = string.Empty;
            Files objFile = new Files();
            result = objFile.updateFile();
            return result;
        }

        [Route("api/File/DownloadFile")]
        [ActionName("DownloadFile")]
        [HttpGet]
        public HttpResponseMessage DownloadFile(long file_Id)
        {
            Files objFile = new Files();
            var fileUrl = objFile.getFileUrl(file_Id);
            var path = System.Web.HttpContext.Current.Server.MapPath("~/FileFolder/" +file_Id+'_' +fileUrl);
            HttpResponseMessage result = new HttpResponseMessage(HttpStatusCode.OK);
            var stream = new FileStream(path, FileMode.Open);
            result.Content = new StreamContent(stream);
            result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            result.Content.Headers.ContentDisposition.FileName = fileUrl;
            result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            result.Content.Headers.ContentLength = stream.Length;
            return result;
        }
    }
}
