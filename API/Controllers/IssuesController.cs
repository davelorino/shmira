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
    [AllowAnonymous]
    public class IssuesController : BaseApiController
    {


        [HttpGet]
        public async Task<IActionResult> GetIssues()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetIssue(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
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

        [HttpPut("{Id}/assign/{assignee_id}")]
        public async Task<IActionResult> AddAssignee(Guid Id, Guid assignee_id)
        {

            return Ok(await Mediator.Send(new AddAssignee.Command{issue_id = Id, 
            assignee_id = assignee_id}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssue(Guid Id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = Id}));
        }

    }
}