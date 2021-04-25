using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Data;
using TimeTable.Models.DAL;
using TimeTable.Services.Interfaces;

namespace TimeTable.Services.Implementations
{
    public class SubjectService : ISubjectService
    {
        private readonly ApplicationDbContext dbContext;
        public SubjectService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task DeleteSubjectAsync(int id)
        {
            Subject subject = await dbContext.Subject.FirstOrDefaultAsync(subject => subject.SubjectId == id);
            dbContext.Subject.Remove(subject);
            await dbContext.SaveChangesAsync();
        }

        public async Task<Subject> GetSubjectAsync(int id)
        {
            return await dbContext.Subject.FirstOrDefaultAsync(subject => subject.SubjectId == id);
        }

        public async Task<List<Subject>> GetSubjectsAsync()
        {
            return await dbContext.Subject.ToListAsync();
        }

        public async Task<int> PostSubjectAsync(string name)
        {
            Subject subject = new Subject { Name = name };
            dbContext.Subject.Add(subject);
            await dbContext.SaveChangesAsync();
            return subject.SubjectId;
        }

        public async Task PutSubjectAsync(int id, string name)
        {
            Subject subject = await dbContext.Subject.FirstOrDefaultAsync(subject => subject.SubjectId == id);
            subject.Name = name;
            await dbContext.SaveChangesAsync();
        }
    }
}
