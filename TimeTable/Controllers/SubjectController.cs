using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Models.DAL;
using TimeTable.Services.Interfaces;

namespace TimeTable.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    //[Authorize]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectService subjectService;
        public SubjectController(ISubjectService subjectService)
        {
            this.subjectService = subjectService;
        }

        [HttpGet("subjects")]
        public async Task<List<Subject>> GetSubjects()
        {
            return await subjectService.GetSubjectsAsync();
        }

        [HttpPost("subjects")]
        public async Task<int> PostSubject([FromBody] string name)
        {
            return await subjectService.PostSubjectAsync(name);
        }

        [HttpPut("subjects/{id}")]
        public async Task PutSubject(int id, [FromBody] string name)
        {
            await subjectService.PutSubjectAsync(id,name);
        }

        [HttpDelete("subjects/{id}")]
        public async Task DeleteSubject(int id)
        {
            await subjectService.DeleteSubjectAsync(id);
        }

        [HttpGet("subjects/{id}")]
        public async Task<Subject> GetSubject(int id)
        {
            return await subjectService.GetSubjectAsync(id);
        }
    }
}
