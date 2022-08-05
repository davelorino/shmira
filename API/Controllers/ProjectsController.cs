using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application.Projects;

namespace API.Controllers
{
   public class ProjectsController : BaseApiController
    {


        [HttpGet]
        public async Task<ActionResult<List<Project>>> GetProjects()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateProject(Project project)
        {
            return Ok(await Mediator.Send(new Create.Command{Project = project}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProject(Guid Id, Project project)
        {
            project.Id = Id;
            return Ok(await Mediator.Send(new Edit.Command{Project = project}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(Guid Id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = Id}));
        }

    }
}