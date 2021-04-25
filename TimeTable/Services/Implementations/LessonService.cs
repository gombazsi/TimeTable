﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Data;
using TimeTable.Models.DAL;
using TimeTable.Models.DTO;
using TimeTable.Services.Interfaces;

namespace TimeTable.Services
{
    public class LessonService : ILessonService
    {
        private readonly ApplicationDbContext dbContext;
        public LessonService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
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

        public async Task<List<LessonDTO>> GetLessonsAsync()
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<Lesson, LessonDTO>()
              .ForMember(dto => dto.LocationName, opt => opt.MapFrom(lesson => lesson.Location.Name))
              .ForMember(dto => dto.SubjectName, opt => opt.MapFrom(lesson => lesson.Subject.Name)));

            List<Lesson> lessons= await dbContext.Lesson
                .Include(lesson => lesson.Subject)
                .Include(lesson => lesson.Location)
                .ToListAsync();
            return new Mapper(mapperConfiguration).Map<List<LessonDTO>>(lessons);
        }

        public async Task<int> PostLessonsAsync(LessonModDTO lessonModDTO)
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<LessonModDTO, Lesson>());
            Lesson lesson = new Mapper(mapperConfiguration).Map<Lesson>(lessonModDTO);
            dbContext.Add(lesson);
            dbContext.Lesson.Remove(await dbContext.Lesson.FirstOrDefaultAsync(l => l.DayOfWeek == lesson.DayOfWeek && l.LessonNumber == lesson.LessonNumber && l.LessonId != lesson.LessonId));
            await dbContext.SaveChangesAsync();
            return lesson.LessonId;
        }

        public async Task PutLessonAsync(int id, LessonModDTO lessonModDTO)
        {
            MapperConfiguration mapperConfiguration = new MapperConfiguration(cfg => cfg.CreateMap<LessonModDTO, Lesson>());
            Lesson lesson = await dbContext.Lesson.FirstOrDefaultAsync(lesson => lesson.LessonId == id);
            lesson = new Mapper(mapperConfiguration).Map<LessonModDTO, Lesson>(lessonModDTO, lesson);
            dbContext.Lesson.Remove(await dbContext.Lesson.FirstOrDefaultAsync(l => l.DayOfWeek == lesson.DayOfWeek && l.LessonNumber == lesson.LessonNumber && l.LessonId != lesson.LessonId));
            await dbContext.SaveChangesAsync();
        }
    }
}