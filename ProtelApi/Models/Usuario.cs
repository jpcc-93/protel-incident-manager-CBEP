using System.ComponentModel.DataAnnotations;

namespace ProtelApi.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }

        [Required]
        [StringLength(50)]
        public required string Username { get; set; }

        [Required]
        public required string PasswordHash { get; set; }
        
        [StringLength(50)]
        public string Role { get; set; } = "User"; // Rol por defecto
    }
}
