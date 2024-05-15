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
	
	// GET: activity/board/{boardId}/{count}
	[HttpGet("board/{boardId}/{count}")]
	public async Task<ActionResult<IEnumerable<ActivityDTO>>> GetLastLogsByBoardId(int boardId, int count)
	{
		var logs = await _activityService.GetLastLogsByBoardId(boardId, count);
		
		return Ok(logs);
	}
	
	// GET: activity/card/{cardId}/{count}
	[HttpGet("card/{cardId}/{count}")]
	public async Task<ActionResult<IEnumerable<ActivityDTO>>> GetLogsByCardId(int cardId, int count)
	{
		var logs = await _activityService.GetLastLogsByCardId(cardId, count);
		
		return Ok(logs);
	}
}