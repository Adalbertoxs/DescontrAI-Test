using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TesteController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TesteController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("conexao")]
    public IActionResult TestarConexao()
    {
        try
        {
            var existe = _context.Database.CanConnect();
            if (existe)
                return Ok("Conexão com o banco está funcionando!");
            else
                return StatusCode(500, "Não foi possível conectar ao banco.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro: {ex.Message}");
        }
    }
}