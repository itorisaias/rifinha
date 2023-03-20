using Microsoft.AspNetCore.Mvc;

namespace Rifinha.Api.Controllers.v1
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok();
        }
    }
}
