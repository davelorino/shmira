using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;

namespace Application.Issues
{
    public class EditMultiple
    {
        public class Command : IRequest
        {
        public List<Issue> Issues { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                    
                    foreach(var current_issue in request.Issues){
                        var issue = await _context.Issues.FindAsync(current_issue.Id);
                        _mapper.Map(current_issue, issue);
                        await _context.SaveChangesAsync();
                    }

                    return Unit.Value;
            }
        }
    }


}