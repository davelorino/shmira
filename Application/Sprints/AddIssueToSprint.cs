using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Application.Core;
using Application.Issues;

namespace Application.Sprints
{
    public class AddIssueToSprint
    {
        public class Command : IRequest<Result<Unit>>
        {
        public Guid sprint_id { get; set; }

        public Guid issue_id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
        
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                    
                    var sprint = await _context.Sprints
                        .Include(i => i.issues)
                        //.ProjectTo<SprintDto>(_mapper.ConfigurationProvider)
                        .FirstOrDefaultAsync(x => x.Id == request.sprint_id);

                    if (sprint == null) return null;
                    
                    var issue = await _context.Issues
                        .Include(a => a.assignees)
                        .FirstOrDefaultAsync(x => x.Id == request.issue_id);
                    
                    if (issue == null) return null;

                    var alreadyInTheSprint = sprint.issues
                        .FirstOrDefault(x => x.IssueId == request.issue_id);

                    if (alreadyInTheSprint != null)
                        sprint.issues.Remove(alreadyInTheSprint);  

                    if(alreadyInTheSprint == null)
                    {
                        var issueToAdd = new SprintIssue 
                        {
                            Sprint = sprint,
                            Issue = issue
                        };
                        sprint.issues.Add(issueToAdd);
                    }

                    var result = await _context.SaveChangesAsync() > 0;

                    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem adding issue to sprint.");

            }
        }
    }


}