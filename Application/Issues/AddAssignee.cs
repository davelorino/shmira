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
    public class AddAssignee
    {
        public class Command : IRequest
        {
        public Issue Issue { get; set; }

       // public Assignee Assignee { get; set; }
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
                    
                    //var assignee = await _context.Assignees.FindAsync(request.Assignee.Id);
                    
                    //request.Issue.assignees.Add(assignee);
                    
                    var issue = await _context.Issues.FindAsync(request.Issue.Id);

                    _mapper.Map(request.Issue, issue);

                    await _context.SaveChangesAsync();

                    return Unit.Value;
            }
        }
    }


}