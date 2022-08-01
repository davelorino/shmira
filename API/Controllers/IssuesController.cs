using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Persistence;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class IssuesController : BaseApiController
    {
        private readonly DataContext _context;
        public IssuesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Issue>>> GetIssues()
        {
            return await _context.Issues.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Issue>> GetIssue(Guid id)
        {
            return await _context.Issues.FindAsync(id);
        }
    }
}