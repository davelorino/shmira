using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application.Projects;
using Application.Core;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
   public class ProjectsController : BaseApiController
    {


        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
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

        [HttpPut("{Id}/edit_sprints/{sprint_id}")]
        public async Task<IActionResult> AddSprintToProject(Guid Id, Guid sprint_id)
        {

            return Ok(await Mediator.Send(new AddSprintToProject.Command{project_id = Id, 
            sprint_id = sprint_id}));
        }

    }
}