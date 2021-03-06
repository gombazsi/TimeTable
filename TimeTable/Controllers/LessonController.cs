using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Models.DAL;
using TimeTable.Models.DTO;
using TimeTable.Services.Interfaces;

namespace TimeTable.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    //[Authorize]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService lessonService;
        public LessonController(ILessonService lessonService)
        {
            this.lessonService = lessonService;
        }


        [HttpGet("lessons")]
        public async Task<List<LessonDTO>> GetLessons()
        {
            string userName = HttpContext.User?.Identity.Name;
            return await lessonService.GetLessonsAsync(userName);
        }

        [HttpPost("lessons")]
        public async Task<int> PostLesson([FromBody] LessonModDTO lesson) 
        {
            string userName = HttpContext.User?.Identity.Name;
            return await lessonService.PostLessonsAsync(lesson,userName);
        }

        [HttpPut("lessons/{id}")]
        public async Task PutLesson(int id, [FromBody] LessonModDTO lesson)
        {
            await lessonService.PutLessonAsync(id, lesson);
        }

        [HttpDelete("lessons/{id}")]
        public async Task DeleteLesson(int id)
        {
            await lessonService.DeleteLessonAsync(id);
        }

        [HttpGet("lessons/{id}")]
        public async Task<LessonDTO> GetLesson(int id)
        {
            return await lessonService.GetLessonAsync(id);
        }
    }
}
