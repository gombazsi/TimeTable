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
    public class LocationController : ControllerBase
    {
        private readonly ILocationService locationService;
        public LocationController(ILocationService locationService)
        {
            this.locationService = locationService;
        }

        [HttpGet("locations")]
        public async Task<List<Location>> GetSubjects()
        {
            return await locationService.GetLocationsAsync();
        }

        [HttpPost("locations")]
        public async Task<int> PostSubject([FromBody] string name)
        {
            return await locationService.PostLocationAsync(name);
        }

        [HttpPut("locations/{id}")]
        public async Task PutSubject(int id, [FromBody] string name)
        {
            await locationService.PutLocationAsync(id, name);
        }

        [HttpDelete("locations/{id}")]
        public async Task DeleteSubject(int id)
        {
            await locationService.DeleteLocationAsync(id);
        }

        [HttpGet("locations/{id}")]
        public async Task<Location> GetLocation(int id)
        {
            return await locationService.GetLocation(id);
        }
    }
}
