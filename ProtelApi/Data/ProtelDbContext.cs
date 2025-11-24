using Microsoft.EntityFrameworkCore;
using ProtelApi.Models;

namespace ProtelApi.Data
{
    public class ProtelDbContext : DbContext
    {
        public ProtelDbContext(DbContextOptions<ProtelDbContext> options) : base(options)
        {
        }

        // DbSets que representan las tablas de la base de datos
        public DbSet<Cliente> Clientes { get; set; }
                public DbSet<Factibilidad> Factibilidades { get; set; }
                public DbSet<EstadoCliente> EstadosCliente { get; set; }
                public DbSet<EstadoFactibilidad> EstadosFactibilidad { get; set; }
                public DbSet<Usuario> Usuarios { get; set; } // Añadir DbSet para Usuario
        
                protected override void OnModelCreating(ModelBuilder modelBuilder)
                {
                    modelBuilder.Entity<Cliente>()
                        .HasIndex(c => c.Documento)
                        .IsUnique();
        
                    modelBuilder.Entity<Usuario>() // Añadir índice único para Username
                        .HasIndex(u => u.Username)
                        .IsUnique();
        
                    modelBuilder.Entity<Factibilidad>()
                        .HasOne(f => f.Cliente)
                        .WithMany(c => c.Factibilidades)
                        .HasForeignKey(f => f.IdCliente);
                    
                    modelBuilder.Entity<Factibilidad>()
                        .HasOne(f => f.EstadoFactibilidad)
                        .WithMany(e => e.Factibilidades)
                        .HasForeignKey(f => f.IdEstadoFactibilidad);
                }
            }
        }
        