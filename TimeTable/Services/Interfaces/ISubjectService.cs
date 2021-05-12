using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Models.DAL;

namespace TimeTable.Services.Interfaces
{
    public interface ISubjectService
    {
        Task<List<Subject>> GetSubjectsAsync(string userName);
        Task<int> PostSubjectAsync(string name, string userName);
        Task PutSubjectAsync(int id, string name);
        Task DeleteSubjectAsync(int id);
        Task<Subject> GetSubjectAsync(int id);
    }
}
