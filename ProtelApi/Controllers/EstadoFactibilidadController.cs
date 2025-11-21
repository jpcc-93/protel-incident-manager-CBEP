using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtelApi.Data;
using ProtelApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProtelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoFactibilidadController : ControllerBase
    {
        private readonly ProtelDbContext _context;

        public EstadoFactibilidadController(ProtelDbContext context)
        {
            _context = context;
        }

        // GET: api/EstadoFactibilidad
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstadoFactibilidad>>> GetEstadosFactibilidad()
        {
            return await _context.EstadosFactibilidad.ToListAsync();
        }
    }
}
