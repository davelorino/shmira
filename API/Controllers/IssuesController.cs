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

        [HttpPut("update_multiple")]
        public async Task<IActionResult> EditIssues([FromBody] List<Issue> issues)
        {
            return Ok(await Mediator.Send(new EditMultiple.Command{Issues = issues}));
        }

        [HttpPut("{Id}/assign/{assignee_id}")]
        public async Task<IActionResult> AddAssignee(Guid Id, Guid assignee_id)
        {

            return Ok(await Mediator.Send(new AddAssignee.Command{issue_id = Id, 
            assignee_id = assignee_id}));
        }


        [HttpPut("add_assignees_to_issue")]
        public async Task<IActionResult> AddAssigneesToIssue(List<FrontendIssueAssignees> issue_assignees)
        {

            return Ok(await Mediator.Send(new AddAssigneesToIssue.Command{issue_assignees = issue_assignees}));
        }

        [HttpPut("add_assignee_to_issue")]
        public async Task<IActionResult> AddAssigneeToIssue(FrontendIssueAssignees issue_assignee)
        {

            return Ok(await Mediator.Send(new AddAssigneeToIssue.Command{issue_assignee = issue_assignee}));
        }

        [HttpPut("remove_assignee_from_issue")]
        public async Task<IActionResult> RemoveAssigneeFromIssue(FrontendIssueAssignees issue_assignee)
        {

            return Ok(await Mediator.Send(new RemoveAssigneeFromIssue.Command{issue_assignee = issue_assignee}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIssue(Guid Id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = Id}));
        }

    }
}