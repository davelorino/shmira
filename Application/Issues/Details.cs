using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Issues;
using MediatR;
using Domain;
using Persistence;

namespace Application.Issues
{
    public class Details
    {
        public class Query : IRequest<Issue>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Issue>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Issue> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Issues.FindAsync(request.Id);
            }
        }
    }
}