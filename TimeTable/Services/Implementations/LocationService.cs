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
    public class LocationService : ILocationService
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<ApplicationUser> userManager;

        public LocationService(ApplicationDbContext dbContext, UserManager<ApplicationUser> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }
        public async Task DeleteLocationAsync(int id)
        {
            Location location = await dbContext.Location.FirstOrDefaultAsync(location => location.LocationId == id);
            dbContext.Remove(location);
            await dbContext.SaveChangesAsync();
        }

        public async Task<Location> GetLocation(int id)
        {
            return await dbContext.Location.FirstOrDefaultAsync(location => location.LocationId == id);
        }

        public Task<List<Location>> GetLocationsAsync(string userName)
        {
            return dbContext.Location
                .Include(location => location.ApplicationUser)
                .Where(l => l.ApplicationUser.UserName == (userName ?? l.ApplicationUser.UserName))
                .ToListAsync();
        }

        public async Task<int> PostLocationAsync(string name, string userName)
        {
            Location location = new Location { Name = name };
            dbContext.Location.Add(location);
            if (userName != null)
                location.ApplicationUser = await userManager.FindByNameAsync(userName);
            await dbContext.SaveChangesAsync();
            return location.LocationId;
        }

        public async Task PutLocationAsync(int id, string name)
        {
            Location location = await dbContext.Location.FirstOrDefaultAsync(location => location.LocationId == id);
            location.Name = name;
            await dbContext.SaveChangesAsync();
        }
    }
}
