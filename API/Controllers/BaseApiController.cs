using System.Runtime.CompilerServices;
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    [ApiController]
    [Route("api/{controller}")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        // if mediator object is not created then create one from the service.protected used so other derived/children classes can use mediator object
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>(); 

        protected ActionResult HandleResult<T>(Result<T> result){
            if(result == null) return NotFound();
            if(result.IsSuccess && result.Value != null){
                return Ok(result.Value);
            }
            if(result.IsSuccess && result.Value == null){
                return NotFound();
            }
            return BadRequest(result.Error);
        }
    }
}