using DocumentGalleryBL;
using DocumentGalleryEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DocumetGalleryWebAPI.Controllers
{
    public class StatusController : ApiController
    {
        [HttpGet]
        [ActionName("GetAllStatus")]
        public List<StatusEntity> Get() {
            List<StatusEntity> statusList = new List<StatusEntity>();
            Status objStatus = new Status();
            statusList = objStatus.GetAllStatus();
            return statusList;
        }
    }
}
