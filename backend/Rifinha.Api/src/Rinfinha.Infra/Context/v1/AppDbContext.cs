using Microsoft.EntityFrameworkCore;
using Rifinha.Domain.Models.Entities.v1;

namespace Rinfinha.Infra.Context.v1;

internal class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions options): base(options) { }

    public DbSet<Custumer> Custumers  { get; set; }
}
