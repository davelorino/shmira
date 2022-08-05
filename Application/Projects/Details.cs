using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace Application.Projects
{
  public class Details
    {
        public class Query : IRequest<Project>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Project>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Project> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Projects.FindAsync(request.Id);
            }
        }
    }
}