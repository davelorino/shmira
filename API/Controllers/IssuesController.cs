using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Application.Issues;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class IssuesController : BaseApiController
    {


        [HttpGet]
        public async Task<ActionResult<List<Issue>>> GetIssues()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Issue>> GetIssue(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateIssue(Issue issue)
        {
            return Ok(await Mediator.Send(new Create.Command{Issue = issue}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditIssue(Guid Id, Issue issue)
        {
            issue.Id = Id;
            return Ok(await Mediator.Send(new Edit.Command{Issue = issue}));
        }
/*
        [HttpPut("/add_assignee/{assignee_id}")]
        public async Task<IActionResult> AddAssignee(Guid Id, Issue issue)
        {
            assignee.Id = Id;
            assignee.Id = assignee.Id;
            return Ok(await Mediator.Send(new AddAssignee.Command{Issue = issue}));
        }
*/
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssue(Guid Id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = Id}));
        }

    }
}