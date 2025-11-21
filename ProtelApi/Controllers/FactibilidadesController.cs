using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtelApi.Data;
using ProtelApi.Models;

namespace ProtelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FactibilidadesController : ControllerBase
    {
        private readonly ProtelDbContext _context;

        public FactibilidadesController(ProtelDbContext context)
        {
            _context = context;
        }

        // GET: api/Factibilidades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Factibilidad>>> GetFactibilidades()
        {
            return await _context.Factibilidades
                                 .Include(f => f.Cliente) // Incluir el cliente relacionado
                                 .Include(f => f.EstadoFactibilidad) // Incluir el estado de factibilidad relacionado
                                 .ToListAsync();
        }

        // GET: api/Factibilidades/search?term=...
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Factibilidad>>> SearchFactibilidades([FromQuery] string? term)
        {
            var query = _context.Factibilidades
                                .Include(f => f.Cliente)
                                .Include(f => f.EstadoFactibilidad)
                                .AsQueryable();

            if (!string.IsNullOrEmpty(term))
            {
                query = query.Where(f =>
                    f.NombreProyecto.Contains(term) ||
                    (f.Cliente != null && f.Cliente.Nombre.Contains(term)) ||
                    (f.EstadoFactibilidad != null && f.EstadoFactibilidad.Nombre.Contains(term))
                );
            }

            return await query.ToListAsync();
        }

        // GET: api/Factibilidades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Factibilidad>> GetFactibilidad(int id)
        {
            var factibilidad = await _context.Factibilidades
                                             .Include(f => f.Cliente)
                                             .Include(f => f.EstadoFactibilidad)
                                             .FirstOrDefaultAsync(f => f.IdFactibilidad == id);

            if (factibilidad == null)
            {
                return NotFound();
            }

            return factibilidad;
        }

        // POST: api/Factibilidades
        [HttpPost]
        public async Task<ActionResult<Factibilidad>> PostFactibilidad(Factibilidad factibilidad)
        {
            _context.Factibilidades.Add(factibilidad);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFactibilidad", new { id = factibilidad.IdFactibilidad }, factibilidad);
        }

        // PUT: api/Factibilidades/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFactibilidad(int id, Factibilidad factibilidad)
        {
            if (id != factibilidad.IdFactibilidad)
            {
                return BadRequest();
            }

            _context.Entry(factibilidad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FactibilidadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Factibilidades/5
        // [HttpDelete("{id}")] // Comentado para implementar borrado lógico
        // public async Task<IActionResult> DeleteFactibilidad(int id)
        // {
        //     var factibilidad = await _context.Factibilidades.FindAsync(id);
        //     if (factibilidad == null)
        //     {
        //         return NotFound();
        //     }

        //     _context.Factibilidades.Remove(factibilidad);
        //     await _context.SaveChangesAsync();

        //     return NoContent();
        // }

        // PATCH: api/Factibilidades/SoftDelete/5
        // Implementa el borrado lógico de una factibilidad, cambiando su estado a "Cancelada".
        [HttpPatch("SoftDelete/{id}")]
        public async Task<IActionResult> SoftDeleteFactibilidad(int id)
        {
            var factibilidad = await _context.Factibilidades.FindAsync(id);
            if (factibilidad == null)
            {
                return NotFound();
            }

            factibilidad.IdEstadoFactibilidad = 3; // 
            _context.Entry(factibilidad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FactibilidadExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool FactibilidadExists(int id)
        {
            return _context.Factibilidades.Any(e => e.IdFactibilidad == id);
        }
    }
}