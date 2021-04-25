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
    public class LocationService : ILocationService
    {
        private readonly ApplicationDbContext dbContext;

        public LocationService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
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

        public Task<List<Location>> GetLocationsAsync()
        {
            return dbContext.Location.ToListAsync();
        }

        public async Task<int> PostLocationAsync(string name)
        {
            Location location = new Location { Name = name };
            dbContext.Location.Add(location);
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
