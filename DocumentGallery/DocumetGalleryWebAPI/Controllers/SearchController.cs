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
    public class SearchController : ApiController
    {
        [Route("api/Search/GetSearchResult")]
        [HttpGet]
        [ActionName("GetSearchResult")]
        public List<DocumentFolderEntity> Get(string search)
        {
            Search objSearch = new Search();
            List<DocumentFolderEntity> result = objSearch.GetSearchResult(search == null ? string.Empty : search);
            return result;
        }
    }
}
