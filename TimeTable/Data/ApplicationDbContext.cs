using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeTable.Models;
using TimeTable.Models.DAL;

namespace TimeTable.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Location>().HasData(new Location { LocationId=1, Name = "Q1" }, new Location {LocationId=2, Name = "QA131" });
            builder.Entity<Subject>().HasData(new Subject { SubjectId=1,Name = "Szoftverfejlesztés .NET platformra" }, new Subject {SubjectId=2, Name = "Szerver oldali Javascript" });
            builder.Entity<Lesson>().HasData(new Lesson { LessonId = 1, SubjectId = 1, LocationId = 1, DayOfWeek = 2, LessonNumber = 3 },
                new Lesson { LessonId = 2, SubjectId = 1, LocationId = 1, DayOfWeek = 2, LessonNumber = 4 },
                new Lesson { LessonId = 3, SubjectId = 2, LocationId = 2, DayOfWeek = 4, LessonNumber = 5 },
                new Lesson { LessonId = 4, SubjectId = 2, LocationId = 2, DayOfWeek = 4, LessonNumber = 6 });
        }

        public DbSet<Subject> Subject { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<Lesson> Lesson { get; set; }
    }
}
