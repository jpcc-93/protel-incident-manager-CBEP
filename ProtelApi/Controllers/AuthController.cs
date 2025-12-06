using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtelApi.Data;
using ProtelApi.Models;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt; // Añadir
using System.Security.Claims;         // Añadir
using Microsoft.Extensions.Configuration; // Añadir
using Microsoft.IdentityModel.Tokens;   // Añadir
using System.Text;                      // Añadir
using System;                           // Añadir

namespace ProtelApi.Controllers
{
    // DTO para el registro de usuario
    public class UserRegisterDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public string? Role { get; set; }
    }

    // DTO para el login de usuario
    public class UserLoginDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ProtelDbContext _context;
        private readonly IConfiguration _configuration; // Añadir

        public AuthController(ProtelDbContext context, IConfiguration configuration) // Modificar constructor
        {
            _context = context;
            _configuration = configuration;
        }

        // POST: api/auth/register
        // Endpoint habilitado para crear usuarios iniciales
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegisterDto request)
        {
            // Verificar si el usuario ya existe
            if (await _context.Usuarios.AnyAsync(u => u.Username == request.Username))
            {
                return BadRequest("El nombre de usuario ya existe.");
            }

            // Hashear la contraseña usando BCrypt
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = new Usuario
            {
                Username = request.Username,
                PasswordHash = passwordHash,
                Role = request.Role ?? "User" // Asigna el rol o "User" por defecto
            };

            _context.Usuarios.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario creado exitosamente" });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginDto request)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Username == request.Username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized("Credenciales inválidas.");
            }

            // --- Generar JWT ---
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.IdUsuario.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured")));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7), // Token válido por 7 días
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { token = tokenHandler.WriteToken(token), username = user.Username, role = user.Role });
        }
    }
}
