using Microsoft.AspNetCore.Mvc;
using WebApplication1; // Namespace do ApplicationDbContext
using WebApplication1.Models;
using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                _context.Users.Add(model);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Usuário registrado com sucesso!" });
            }
            return BadRequest(ModelState);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var usuario = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == model.Username && u.Password == model.Password);

                if (usuario != null)
                {
                    return Ok(new { sucesso = true, mensagem = "Login feito com sucesso!" });
                }
                else
                {
                    return Unauthorized(new { sucesso = false, mensagem = "Usuário ou senha incorretos!" });
                }
            }
            return BadRequest(ModelState);
        }
    }
}