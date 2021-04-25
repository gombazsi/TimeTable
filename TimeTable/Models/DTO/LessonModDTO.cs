using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeTable.Models.DTO
{
    public class LessonModDTO
    {
        public int DayOfWeek { get; set; }
        public int LessonNumber { get; set; }
        public int SubjectId { get; set; }
        public int LocationId { get; set; }
    }
}
