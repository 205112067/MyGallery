using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocumentGalleryEntity
{
    public class DocumentFolderEntity
    {
        public long? Id { get; set; }
        public long? Parent_Id { get; set; }
        public string Name { get; set; }
        public long? Size { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string Type { get; set; }
        public long? Status_Id { get; set; }
        public string Status_Name { get; set; }

    }
}
