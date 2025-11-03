using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ProtelApi.Models
{
    [Table("CLIENTE")]
    public class Cliente
    {
        [Key]
        [Column("ID_CLIENTE")]
        public int IdCliente { get; set; }

        [Required]
        [StringLength(200)]
        [Column("NOMBRE")]
        public string Nombre { get; set; }

        [Required]
        [StringLength(300)]
        [Column("DIRECCION")]
        public string Direccion { get; set; }

        [Required]
        [StringLength(15)]
        [Column("TELEFONO")]
        public string Telefono { get; set; }

        [Required]
        [StringLength(100)]
        [Column("EMAIL")]
        public string Email { get; set; }

        [Required]
        [Column("FECHA_CREACION")]
        public DateTime FechaCreacion { get; set; }

        [Column("FECHA_ACTUALIZACION")] // Ya no es [Required]
        public DateTime? FechaActualizacion { get; set; }

        [Required]
        [Column("ID_ESTADO_CLIENTE")]
        [ForeignKey("EstadoCliente")]
        public int IdEstadoCliente { get; set; }

        // Propiedades de navegación para las relaciones con otras tablas.
        [JsonIgnore]
        public EstadoCliente? EstadoCliente { get; set; }
        public ICollection<Factibilidad> Factibilidades { get; set; } = new List<Factibilidad>();

        [NotMapped]
        public bool Seleccionado { get; set; }
    }
    
}
