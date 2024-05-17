using Microsoft.AspNetCore.Mvc;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;

namespace TaskBoard.PL.Controllers;

[ApiController]
[Route("[controller]")]
public class PriorityController : ControllerBase
{
	private readonly IPriorityService _priorityService;
	
	public PriorityController(IPriorityService priorityService)
	{
		_priorityService = priorityService;
	}
	
	// GET: priority/
	[HttpGet]
	public async Task<ActionResult<IEnumerable<PriorityDTO>>> GetAllPriorities()
	{
		var priorities = await _priorityService.GetAllAsync();
		
		return Ok(priorities);
	}
	
	// POST: priority/
	[HttpPost]
	public async Task<ActionResult> AddPriority([FromBody] PriorityDTO priority)
	{
		priority = await _priorityService.AddAsync(priority);
		
		return Ok(priority);
	}
}