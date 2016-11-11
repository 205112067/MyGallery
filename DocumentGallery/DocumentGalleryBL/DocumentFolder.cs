using Siemens.iPort.EntityLite;
using System;
using System.Web;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using DocumentGalleryEntity;
namespace DocumentGalleryBL
{
    public  class DocumentFolder : EntityManager
    {
        public List<DocumentFolderEntity> GetAllDocumentFolder(long? parent_Id) {
            List<DocumentFolderEntity> folderList = new List<DocumentFolderEntity>();
            string spName = "GET_ALL_FOLDERS";
            ParameterCollection parameters = new ParameterCollection();
            parameters.Add(new SqlParameter("@Parent_Id", parent_Id == 0 ? null : parent_Id));
            DataTable result = this.GetRecords(spName, parameters);
            for (int i = 0; i < result.Rows.Count; i++)
            {
                DocumentFolderEntity objFolder = new DocumentFolderEntity();

                objFolder.Id = Convert.ToInt32(result.Rows[i]["Id"]);
                objFolder.Status_Id = Convert.ToInt32(result.Rows[i]["Status_Id"]);
                objFolder.Name = (result.Rows[i]["Name"]).ToString(); 
                objFolder.Size = Convert.IsDBNull(result.Rows[i]["Size"]) ? null : (int?) Convert.ToInt32(result.Rows[i]["Size"]);
                objFolder.Status_Name = (result.Rows[i]["Status_Name"]).ToString();
                objFolder.Type = (result.Rows[i]["TypeName"]).ToString();
                objFolder.UpdatedOn =Convert.ToDateTime(result.Rows[i]["UpdatedOn"]);
             
                folderList.Add(objFolder);
            }
            return folderList;
        }
        public List<DocumentFolderEntity> GetDocumentFolderDetails(long id,string type)
        {
            List<DocumentFolderEntity> folderList = new List<DocumentFolderEntity>();
            string spName = "GET_FILE_FOLDER_DETAILS";
            ParameterCollection parameters = new ParameterCollection();
            parameters.Add(new SqlParameter("@Id", id));
            parameters.Add(new SqlParameter("@Type", type));
            DataTable result = this.GetRecords(spName, parameters);
            for (int i = 0; i < result.Rows.Count; i++)
            {
                DocumentFolderEntity objFolder = new DocumentFolderEntity();
                objFolder.Status_Id = Convert.ToInt32(result.Rows[i]["Status_Id"]);
                objFolder.Name = (result.Rows[i]["Name"]).ToString();
                folderList.Add(objFolder);
            }
            return folderList;
        }

        public List<DocumentFolderEntity> GetAddressBarURL(long? folder_Id)
        {
            List<DocumentFolderEntity> folderList = new List<DocumentFolderEntity>();
            string spName = "GET_ADDRESS_BAR_URL";
            ParameterCollection parameters = new ParameterCollection();
            parameters.Add(new SqlParameter("@Id", folder_Id == 0 ? null : folder_Id));
            DataTable result = this.GetRecords(spName, parameters);
            for (int i = 0; i < result.Rows.Count; i++)
            {
                DocumentFolderEntity objFolder = new DocumentFolderEntity();

                objFolder.Id = Convert.ToInt32(result.Rows[i]["Id"]);
                objFolder.Name = (result.Rows[i]["Name"]).ToString();
                objFolder.Parent_Id = Convert.ToInt32(result.Rows[i]["Parent_Id"]);

                folderList.Add(objFolder);
            }
            return folderList;
        }




        public void testDB() {
            string spName = "GET_ALL_FOLDERS";
            ParameterCollection parameters = new ParameterCollection();
            parameters.Add(new SqlParameter("@Parent_Id", null));
            DataTable result = this.GetRecords(spName, parameters);
        }
        public string updateDocumentFolder(DocumentFolderEntity objData) {

           string spName = "UPDTAE_FOLDER";
            ParameterCollection parameters = new ParameterCollection();
            parameters.Add(new SqlParameter("@Id", objData.Id==0? null : objData.Id));
            parameters.Add(new SqlParameter("@Name", objData.Name));
            parameters.Add(new SqlParameter("@Status_Id", objData.Status_Id));
            parameters.Add(new SqlParameter("@Parent_Id", objData.Parent_Id == 0 ? null : objData.Parent_Id));

            string result = this.ExecuteProcedure(spName, parameters).ToString();
            return result;
        }
    }
}
