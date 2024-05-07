using Microsoft.AspNetCore.Mvc;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;

namespace TaskBoard.PL.Controllers;

[ApiController]
[Route("[controller]")]
public class ActivityController : ControllerBase
{
	private readonly IActivityService _activityService;
	
	public ActivityController(IActivityService activityService)
	{
		_activityService = activityService;
	}
	
	// GET: activity/
	[HttpGet]
	public async Task<ActionResult<IEnumerable<ActivityDTO>>> GetAllLogs()
	{
		var logs = await _activityService.GetAllLogs();
		
		return Ok(logs);
	}
	
	// GET: activity/{cardId}
	[HttpGet("{cardId}")]
	public async Task<ActionResult<IEnumerable<ActivityDTO>>> GetLogsByCardId(int cardId)
	{
		var logs = await _activityService.GetLogsByCardId(cardId);
		
		return Ok(logs);
	}
}