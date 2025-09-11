using Microsoft.EntityFrameworkCore;
using WebApplication1.Models; // ajuste conforme o seu projeto

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<RegisterViewModel> Users { get; set; } // O nome pode ser Usuarios

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RegisterViewModel>().ToTable("usuarios");
    }
}