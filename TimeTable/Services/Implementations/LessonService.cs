using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Data;
using TimeTable.Models;
using TimeTable.Models.DAL;
using TimeTable.Models.DTO;
using TimeTable.Services.Interfaces;

namespace TimeTable.Services
{
    public class LessonService : ILessonService
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<ApplicationUser> userManager;
        public LessonService(ApplicationDbContext dbContext,UserManager<ApplicationUser> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        public async Task DeleteLessonAsync(int id)
        {
            Lesson lesson = await dbContext.Lesson.FirstOrDefaultAsync(lesson => lesson.LessonId == id);
            dbContext.Remove(lesson);
            await dbContext.SaveChangesAsync();
        }

        public async Task<LessonDTO> GetLessonAsync(int id)
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<Lesson, LessonDTO>()
              .ForMember(dto => dto.LocationName, opt => opt.MapFrom(lesson => lesson.Location.Name))
              .ForMember(dto => dto.SubjectName, opt => opt.MapFrom(lesson => lesson.Subject.Name)));

            Lesson lesson= await dbContext.Lesson
                .Include(lesson=>lesson.Subject)
                .Include(lesson=>lesson.Location)
                .FirstOrDefaultAsync(lesson => lesson.LessonId == id);
            return new Mapper(mapperConfiguration).Map<LessonDTO>(lesson);
        }

        public async Task<List<LessonDTO>> GetLessonsAsync(string userName)
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<Lesson, LessonDTO>()
              .ForMember(dto => dto.LocationName, opt => opt.MapFrom(lesson => lesson.Location.Name))
              .ForMember(dto => dto.SubjectName, opt => opt.MapFrom(lesson => lesson.Subject.Name)));

            List<Lesson> lessons= await dbContext.Lesson
                .Include(lesson => lesson.Subject)
                .Include(lesson => lesson.Location)
                .Include(lesson => lesson.ApplicationUser)
                .Where(l=>l.ApplicationUser.UserName==(userName?? l.ApplicationUser.UserName))
                .ToListAsync();
            return new Mapper(mapperConfiguration).Map<List<LessonDTO>>(lessons);
        }

        public async Task<int> PostLessonsAsync(LessonModDTO lessonModDTO, string userName)
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<LessonModDTO, Lesson>());
            Lesson lesson = new Mapper(mapperConfiguration).Map<Lesson>(lessonModDTO);
            dbContext.Add(lesson);
            Lesson toRemove = await dbContext.Lesson.FirstOrDefaultAsync(l => l.DayOfWeek == lesson.DayOfWeek && l.LessonNumber == lesson.LessonNumber && l.LessonId != lesson.LessonId);
            if(toRemove!=null)
                dbContext.Lesson.Remove(toRemove);
            lesson.ApplicationUser =await userManager.FindByNameAsync(userName);
            await dbContext.SaveChangesAsync();
            return lesson.LessonId;
        }

        public async Task PutLessonAsync(int id, LessonModDTO lessonModDTO)
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<LessonModDTO, Lesson>());
            Lesson lesson = await dbContext.Lesson.FirstOrDefaultAsync(lesson => lesson.LessonId == id);
            lesson = new Mapper(mapperConfiguration).Map<LessonModDTO, Lesson>(lessonModDTO, lesson);
            Lesson toRemove= await dbContext.Lesson.FirstOrDefaultAsync(l => l.DayOfWeek == lesson.DayOfWeek && l.LessonNumber == lesson.LessonNumber && l.LessonId != lesson.LessonId);
            if (toRemove != null)
                dbContext.Lesson.Remove(toRemove);
            await dbContext.SaveChangesAsync();
        }
    }
}
