using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Domain;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Issues
{
    public class List
    {
        public class Query : IRequest<List<Issue>> {}

        public class Handler : IRequestHandler<Query, List<Issue>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Issue>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Issues.ToListAsync();
            }
        }
    }
}