using Siemens.iPort.EntityLite;
using System;
using System.Web;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DocumentGalleryEntity;

namespace DocumentGalleryBL
{
    public class Search : EntityManager
    {
        public List<DocumentFolderEntity> GetSearchResult(string search)
        {
            List<DocumentFolderEntity> folderList = new List<DocumentFolderEntity>();
            string spName = "SEARCH";
            ParameterCollection parameters = new ParameterCollection();
            parameters.Add(new SqlParameter("@search",  search));
            DataTable result = this.GetRecords(spName, parameters);
            for (int i = 0; i < result.Rows.Count; i++)
            {
                DocumentFolderEntity objFolder = new DocumentFolderEntity();

                objFolder.Id = Convert.ToInt32(result.Rows[i]["Id"]);
                objFolder.Status_Id = Convert.ToInt32(result.Rows[i]["Status_Id"]);
                objFolder.Parent_Id = Convert.ToInt32(result.Rows[i]["Parent_Id"]== DBNull.Value ? 0 : result.Rows[i]["Parent_Id"]);
                objFolder.Name = (result.Rows[i]["Name"]).ToString();
                objFolder.Status_Name = (result.Rows[i]["Status_Name"]).ToString();
                objFolder.Type = (result.Rows[i]["TypeName"]).ToString();
                objFolder.UpdatedOn = Convert.ToDateTime(result.Rows[i]["UpdatedOn"]);

                folderList.Add(objFolder);
            }
            return folderList;
        }

    }
}
