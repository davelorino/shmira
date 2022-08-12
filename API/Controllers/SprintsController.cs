using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application.Sprints;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
   public class SprintsController : BaseApiController
    {


        [HttpGet]
        public async Task<IActionResult> GetSprints()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Sprint>> GetSprint(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateSprint(Sprint sprint)
        {
            return Ok(await Mediator.Send(new Create.Command{Sprint = sprint}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSprint(Guid Id, Sprint sprint)
        {
            sprint.Id = Id;
            return Ok(await Mediator.Send(new Edit.Command{Sprint = sprint}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSprint(Guid Id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = Id}));
        }

        [HttpPut("{Id}/edit_issues/{issue_id}")]
        public async Task<IActionResult> AddIssueToSprint(Guid Id, Guid issue_id)
        {

            return Ok(await Mediator.Send(new AddIssueToSprint.Command{sprint_id = Id, 
            issue_id = issue_id}));
        }

    }
}