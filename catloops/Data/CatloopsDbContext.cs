using Microsoft.EntityFrameworkCore;
using catloops.Models;
namespace catloops.Data;

public class CatloopsDbContext : DbContext
{
    public CatloopsDbContext(DbContextOptions<CatloopsDbContext> options) : base(options)
    {
    }

    public DbSet<Users> Users { get; set; }
    public DbSet<Membership> Memberships { get; set; }
}