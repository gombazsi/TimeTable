using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Models.DAL;
using TimeTable.Models.DTO;

namespace TimeTable.Services.Interfaces
{
    public interface ILessonService
    {
        Task<LessonDTO> GetLessonAsync(int id);
        Task<int> PostLessonsAsync(LessonModDTO lesson, string userName);
        Task PutLessonAsync(int id, LessonModDTO lesson);
        Task DeleteLessonAsync(int id);
        Task<List<LessonDTO>> GetLessonsAsync(string userName);
    }
}
