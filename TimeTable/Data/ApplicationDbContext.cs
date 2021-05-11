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

        /*protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Subject>()
                .HasOne(s => s.A)
                .WithMany(t => t.Templates)
                .HasForeignKey(temp => temp.TeacherId);
        }*/

        public DbSet<Subject> Subject { get; set; }
        public DbSet<Location> Location { get; set; }
        public DbSet<Lesson> Lesson { get; set; }
    }
}
