using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TimeTable.Models.DAL
{
    public class Subject
    {
        public int SubjectId { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
