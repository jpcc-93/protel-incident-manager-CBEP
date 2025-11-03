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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración de las relaciones entre entidades

            // Cliente tiene un EstadoCliente (uno a muchos)
            modelBuilder.Entity<Cliente>()
                .HasOne(c => c.EstadoCliente)
                .WithMany(e => e.Clientes)
                .HasForeignKey(c => c.IdEstadoCliente);

            // Factibilidad pertenece a un Cliente (uno a muchos)
            modelBuilder.Entity<Factibilidad>()
                .HasOne(f => f.Cliente)
                .WithMany(c => c.Factibilidades)
                .HasForeignKey(f => f.IdCliente)
                .IsRequired();

            // Factibilidad tiene un EstadoFactibilidad (uno a muchos)
            modelBuilder.Entity<Factibilidad>()
                .HasOne(f => f.EstadoFactibilidad)
                .WithMany(e => e.Factibilidades)
                .HasForeignKey(f => f.IdEstadoFactibilidad)
                .IsRequired();

            // Opcional: Puedes añadir datos iniciales (seed data) aquí si lo deseas
            // modelBuilder.Entity<EstadoCliente>().HasData(
            //     new EstadoCliente { IdEstadoCliente = 1, Nombre = "Activo" },
            //     new EstadoCliente { IdEstadoCliente = 2, Nombre = "Inactivo" }
            // );
        }
    }
}