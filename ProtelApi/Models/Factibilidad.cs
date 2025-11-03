using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ProtelApi.Models
{
    [Table("FACTIBILIDAD")] // Añadimos el nombre de la tabla explícitamente
    public class Factibilidad
    {
        [Key]
        [Column("ID_FACTIBILIDAD")]
        public int IdFactibilidad { get; set; }

        [Required]
        [Column("ID_CLIENTE")]
        [ForeignKey("Cliente")]
        public int IdCliente { get; set; }

        [Required]
        [StringLength(200)] // Añadimos StringLength para consistencia
        [Column("NOMBRE_PROYECTO")]
        public string NombreProyecto { get; set; }

        [StringLength(255)] // Añadimos StringLength para consistencia
        [Column("DESCRIPCION")]
        public string Descripcion { get; set; }

        [Required]
        [StringLength(255)] // Añadimos StringLength para consistencia
        [Column("UBICACION")]
        public string Ubicacion { get; set; }

        [Column("FECHA_SOLICITUD")]
        public DateTime FechaSolicitud { get; set; }

        [Column("FECHA_RESPUESTA")]
        public DateTime? FechaRespuesta { get; set; }

        [Required]
        [Column("ID_ESTADO_FACTIBILIDAD")]
        [ForeignKey("EstadoFactibilidad")]
        public int IdEstadoFactibilidad { get; set; }

        // Propiedades de navegación para las relaciones con otras tablas
        [JsonIgnore]
        public Cliente? Cliente { get; set; }
        [JsonIgnore]
        public EstadoFactibilidad? EstadoFactibilidad { get; set; }

        [NotMapped]
        public bool Seleccionado { get; set; }
    }
}
