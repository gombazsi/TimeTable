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
    public class LocationController : ControllerBase
    {
        private readonly ILocationService locationService;
        public LocationController(ILocationService locationService)
        {
            this.locationService = locationService;
        }

        [HttpGet("locations")]
        public async Task<List<Location>> GetLocations()
        {
            string userName = HttpContext.User?.Identity.Name;
            return await locationService.GetLocationsAsync(userName);
        }

        [HttpPost("locations")]
        public async Task<int> PostLocation([FromBody] string name)
        {
            string userName = HttpContext.User?.Identity.Name;
            return await locationService.PostLocationAsync(name,userName);
        }

        [HttpPut("locations/{id}")]
        public async Task PutLocation(int id, [FromBody] string name)
        {
            await locationService.PutLocationAsync(id, name);
        }

        [HttpDelete("locations/{id}")]
        public async Task DeleteLocation(int id)
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
