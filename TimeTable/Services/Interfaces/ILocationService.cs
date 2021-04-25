using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Models.DAL;

namespace TimeTable.Services.Interfaces
{
    public interface ILocationService
    {
        Task<List<Location>> GetLocationsAsync();
        Task<int> PostLocationAsync(string name);
        Task PutLocationAsync(int id, string name);
        Task DeleteLocationAsync(int id);
        Task<Location> GetLocation(int id);
    }
}
