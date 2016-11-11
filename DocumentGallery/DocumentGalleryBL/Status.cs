using DocumentGalleryEntity;
using Siemens.iPort.EntityLite;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DocumentGalleryBL
{
    public class Status : EntityManager
    {
        public List<StatusEntity> GetAllStatus() {
            List<StatusEntity> statusList = new List<StatusEntity>();
            string spName = "GET_ALL_STATUS";
            ParameterCollection parameters = new ParameterCollection();
            parameters.Add(new SqlParameter("@Id", null));
            DataTable result = this.GetRecords(spName, parameters);
            for (int i = 0; i < result.Rows.Count; i++)
            {
                StatusEntity objStatus = new StatusEntity();

                objStatus.Id = Convert.ToInt32(result.Rows[i]["Id"]);
                objStatus.Name = (result.Rows[i]["Name"]).ToString();

                statusList.Add(objStatus);
            }
            return statusList;


        }
    }
}
