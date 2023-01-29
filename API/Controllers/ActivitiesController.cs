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
        public async Task<IActionResult> GetActivities(CancellationToken ct){
            var list = await Mediator.Send(new List.Query(),ct);
            return HandleResult(list);
        }
        [HttpGet("{id}")] // api/activities/id
        public async Task<IActionResult> GetActivity(Guid id){

            var result =  await Mediator.Send(new Details.Query{Id = id});
            return HandleResult(result);

            
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody]Activity activity){

            return HandleResult(await Mediator.Send(new Create.Command{Activity = activity}));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id,[FromBody] Activity activity){

            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Activity = activity}));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id){
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }

    }
}