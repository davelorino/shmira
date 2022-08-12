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
using Application.Sprints;

namespace Application.Projects
{
    public class AddSprintToProject
    {
        public class Command : IRequest<Result<Unit>>
        {
        public Guid project_id { get; set; }

        public Guid sprint_id { get; set; }
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
                    
                    var project = await _context.Projects
                        .Include(s => s.sprints)
                        .FirstOrDefaultAsync(x => x.Id == request.project_id);

                    if (project == null) return null;
                    
                    var sprint = await _context.Sprints
                        .Include(i => i.issues)
                        .FirstOrDefaultAsync(x => x.Id == request.sprint_id);
                    
                    if (sprint == null) return null;

                    var alreadyInTheProject = project.sprints
                        .FirstOrDefault(x => x.SprintId == request.sprint_id);

                    if (alreadyInTheProject != null)
                        project.sprints.Remove(alreadyInTheProject);  

                    if(alreadyInTheProject == null)
                    {
                        var sprintToAdd = new ProjectSprint 
                        {
                            Project = project,
                            Sprint = sprint
                        };
                        project.sprints.Add(sprintToAdd);
                    }

                    var result = await _context.SaveChangesAsync() > 0;

                    return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem adding issue to sprint.");

            }
        }
    }


}