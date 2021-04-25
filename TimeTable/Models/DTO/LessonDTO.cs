using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeTable.Models.DTO
{
    public class LessonDTO
    {
        public int LessonId { get; set; }
        public int DayOfWeek { get; set; }
        public int LessonNumber { get; set; }
        public int SubjectId { get; set; }
        public string SubjectName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
    }
}
