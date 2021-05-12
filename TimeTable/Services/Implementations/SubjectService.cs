using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Data;
using TimeTable.Models;
using TimeTable.Models.DAL;
using TimeTable.Services.Interfaces;

namespace TimeTable.Services.Implementations
{
    public class SubjectService : ISubjectService
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<ApplicationUser> userManager;
        public SubjectService(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
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

        public async Task<List<Subject>> GetSubjectsAsync(string userName)
        {
            return await dbContext.Subject
                .Include(subject => subject.ApplicationUser)
                .Where(s => s.ApplicationUser.UserName == (userName ?? s.ApplicationUser.UserName))
                .ToListAsync();
        }

        public async Task<int> PostSubjectAsync(string name, string userName)
        {
            Subject subject = new Subject { Name = name };
            dbContext.Subject.Add(subject);
            subject.ApplicationUser = await userManager.FindByNameAsync(userName);
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
