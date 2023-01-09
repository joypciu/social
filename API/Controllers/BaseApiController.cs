using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
    [ApiController]
    [Route("api/{Controller}")]
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        // if mediator object is not created then create one from the service.protected used so other derived/children classes can use mediator object
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>(); 
    }
}