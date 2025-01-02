using FlagsQuizApi.Entities;
using Microsoft.EntityFrameworkCore;

namespace FlagsQuizApi.Data;
public class ApplicationDbContext: DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Country> Countries { get; set; }

}