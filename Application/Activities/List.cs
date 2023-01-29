using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
namespace Application.Activities
{
    public class List
    {
        public class Query: IRequest<Result<List<Activity>>> {}

        public class Handler : IRequestHandler<Query, Result<List<Activity>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;

            public Handler(DataContext context,ILogger<List> logger)
            {
                _context = context;
                _logger = logger;
            }

            

            public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // try
                // {
                //     for(int i=0;i<10;i++){
                //         cancellationToken.ThrowIfCancellationRequested();
                //         await Task.Delay(1000,cancellationToken);
                //         _logger.LogInformation($"Task {i} has completed");
                //     }
                // }
                // catch (System.Exception)
                // {
                    
                //     _logger.LogInformation("Task was cancelled");
                // }
               var list = await _context.Activities.ToListAsync();
               return Result<List<Activity>>.Success(list);
            }
        }

    }
}