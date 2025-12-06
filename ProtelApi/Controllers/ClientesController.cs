using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProtelApi.Data;
using ProtelApi.Models;

namespace ProtelApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {
        private readonly ProtelDbContext _context;

        public ClientesController(ProtelDbContext context)
        {
            _context = context;
        }

        // GET: api/Clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
            return await _context.Clientes.ToListAsync();
        }

        // GET: api/Clientes/search?term=...
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Cliente>>> SearchClientes([FromQuery] string? term)
        {
            if (string.IsNullOrEmpty(term))
            {
                // Si no hay término de búsqueda, devuelve solo los clientes activos.
                return await _context.Clientes
                                     .Where(c => c.IdEstadoCliente == 1)
                                     .ToListAsync();
            }

            var lowerCaseTerm = term.ToLower();

            var clientes = await _context.Clientes
                                         .Where(c => c.IdEstadoCliente == 1 &&
                                                     (c.Nombre.ToLower().Contains(lowerCaseTerm) ||
                                                      c.Documento.ToLower().Contains(lowerCaseTerm)))
                                         .ToListAsync();

            return clientes;
        }

        // GET: api/Clientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
            var cliente = await _context.Clientes
                                        .Include(c => c.Factibilidades) // Incluir factibilidades relacionadas
                                        .FirstOrDefaultAsync(c => c.IdCliente == id);

            if (cliente == null)
            {
                return NotFound();
            }

            return cliente;
        }

        // POST: api/Clientes
        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCliente", new { id = cliente.IdCliente }, cliente);
        }

        // PUT: api/Clientes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(int id, Cliente cliente)
        {
            if (id != cliente.IdCliente)
            {
                return BadRequest();
            }
            _context.Entry(cliente).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
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

        // PATCH: api/Clientes/SoftDelete/5
        [HttpPatch("SoftDelete/{id}")]
        public async Task<IActionResult> SoftDeleteCliente(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            cliente.IdEstadoCliente = 2; 
            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
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

        private bool ClienteExists(int id)
        {
            return _context.Clientes.Any(e => e.IdCliente == id);
        }
    }
}