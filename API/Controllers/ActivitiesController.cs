using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        
        [HttpGet] // api/activities
        public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct){
            return await Mediator.Send(new List.Query(),ct);
        }
        [HttpGet("{id}")] // api/activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id){
            return await Mediator.Send(new Details.Query{Id = id});
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity){

            return Ok(await Mediator.Send(new Create.Command{Activity = activity}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id,[FromBody] Activity activity){

            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}