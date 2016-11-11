using Siemens.iPort.EntityLite;
using System.Web;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using System.Data.SqlClient;
using System;
using System.IO;

namespace DocumentGalleryBL
{
    public class File : EntityManager
    {
        public string updateFile()
        {
            string spName = "UPDATE_FILE";
            var httpRequest = HttpContext.Current.Request;
            var json_serializer = new JavaScriptSerializer();
            var list = (IDictionary<string, object>)json_serializer.DeserializeObject(httpRequest.Form["objFile"]);
            try
            {
                if (httpRequest.Files.Count > 0)
                {
                    foreach (string file in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[file];
                       
                        ParameterCollection parameters = new ParameterCollection();
                        parameters.Add(new SqlParameter("@Id", Convert.ToInt32(list["Id"]) == 0 ? null : list["Id"]));
                        parameters.Add(new SqlParameter("@Name", list["Name"]));
                        parameters.Add(new SqlParameter("@Size", list["Size"]));
                        parameters.Add(new SqlParameter("@FileUrl", postedFile.FileName.ToString()));
                        parameters.Add(new SqlParameter("@Parent_Id", Convert.ToInt32(list["Parent_Id"]) == 0 ? null : list["Parent_Id"]));
                        parameters.Add(new SqlParameter("@Type", list["Type"]));
                        parameters.Add(new SqlParameter("@Status_Id", list["Status_Id"]));
                        long fileId = Convert.ToInt32(this.ExecuteProcedure(spName, parameters));

                        var filePath = HttpContext.Current.Server.MapPath("/FileFolder/");
                        postedFile.SaveAs(filePath +fileId.ToString()+'_'+postedFile.FileName);
                        
                    }
                }
            }
            catch (HttpException ex)
            {
                throw new Exception("Uploaded file exceeds 100MB." + ex);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.InnerException.InnerException.Message);
            }
            return "successfully uploaded";
        }
        public string getFileUrl(long file_Id) {
            string fileUrl = string.Empty;
            string spName = "GET_FILE_URL";
            ParameterCollection parameters = new ParameterCollection();
            parameters.Add(new SqlParameter("@File_Id", file_Id));
            fileUrl = this.ExecuteProcedure(spName, parameters).ToString();
            return fileUrl;
        }
    }
}
