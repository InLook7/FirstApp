using Microsoft.AspNetCore.Mvc;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;

namespace TaskBoard.PL.Controllers;

[ApiController]
[Route("[controller]")]
public class AnalyticsController : ControllerBase
{
	private readonly IAnalyticsService _analyticsService;
	
	public AnalyticsController(IAnalyticsService analyticsService)
	{
		_analyticsService = analyticsService;
	}
	
	// GET: analytics/
	[HttpGet]
	public async Task<ActionResult<IEnumerable<CountCardsDTO>>> CountCardsByStatuses()
	{
		var counts = await _analyticsService.CountCardsByStatuses();
		
		return Ok(counts);
	}
}