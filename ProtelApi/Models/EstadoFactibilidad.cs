using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProtelApi.Models
{
    [Table("ESTADO_FACTIBILIDAD")]
    public class EstadoFactibilidad
    {
        [Key]
        [Column("ID_ESTADO_FACTIBILIDAD")]
        public int IdEstadoFactibilidad { get; set; }

        [Required]
        [StringLength(100)]
        [Column("NOMBRE")]
        public string Nombre { get; set; }

        // Propiedad de navegación para la relación con la tabla Factibilidad.
        public ICollection<Factibilidad> Factibilidades { get; set; } = new List<Factibilidad>();
    }
}