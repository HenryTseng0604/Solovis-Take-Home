using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class PortfolioController : BaseApiController
    {
        private readonly DataContext _context;

        public PortfolioController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<Portfolio>> GetPortfolio()
        {
            var investments = await _context.Investments.ToListAsync();
            var portfolioGroups = await _context.PortfolioGroupings.ToListAsync();
            return new Portfolio(portfolioGroups, investments);
        }
        [HttpGet("Investments")]
        public async Task<ActionResult<List<Investment>>> GetInvestments()
        {
            return await _context.Investments.Where(x => x.CurrentValue > 0).ToListAsync();
        }
    }
}
