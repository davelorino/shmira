using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Sprints
{
    public class List
    {
        public class Query : IRequest<List<Sprint>> {}

        public class Handler : IRequestHandler<Query, List<Sprint>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Sprint>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Sprints.ToListAsync();
            }
        }
    }
}