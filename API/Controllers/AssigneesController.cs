using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Assignees;
using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
     public class AssigneesController : BaseApiController
    {


        [HttpGet]
        public async Task<ActionResult<List<Assignee>>> GetAssignees()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Assignee>> GetAssignee(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateIssue(Assignee assignee)
        {
            return Ok(await Mediator.Send(new Create.Command{Assignee = assignee}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditAssignee(Guid Id, Assignee assignee)
        {
            assignee.Id = Id;
            return Ok(await Mediator.Send(new Edit.Command{Assignee = assignee}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssignee(Guid Id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = Id}));
        }

    }
}