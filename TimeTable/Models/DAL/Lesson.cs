using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeTable.Models.DAL
{
    public class Lesson
    {
        public int LessonId { get; set; }
        public int DayOfWeek { get; set; }
        public int LessonNumber { get; set; }
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
        public int LocationId { get; set; }
        public Location Location { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
