using Microsoft.AspNetCore.Mvc;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;

namespace TaskBoard.PL.Controllers;

[ApiController]
[Route("[controller]")]
public class StatusController : ControllerBase
{
	private readonly IStatusService _statusService;
	
	public StatusController(IStatusService statusService)
	{
		_statusService = statusService;
	}
	
	// GET: status/{statusId}
	[HttpGet("{statusId}")]
	public async Task<ActionResult<IEnumerable<StatusDTO>>> GetStatusById(int statusId)
	{
		var status = await _statusService.GetByIdAsync(statusId);
		
		return Ok(status);
	}
	
	// GET: status/board/{boardId}
	[HttpGet("board/{boardId}")]
	public async Task<ActionResult<IEnumerable<StatusDTO>>> GetStatusesByBoardId(int boardId)
	{
		var statuses = await _statusService.GetStatusesByBoardId(boardId);
		
		return Ok(statuses);
	}
	
	// POST: status/
	[HttpPost]
	public async Task<ActionResult> AddStatus([FromBody] StatusDTO status)
	{
		status = await _statusService.AddAsync(status);
		
		return Ok(status);
	}
	
	// PUT: status/
	[HttpPut]
	public async Task<ActionResult> UpdateStatus([FromBody] StatusDTO status)
	{
		status = await _statusService.UpdateAsync(status);
		
		return Ok(status);
	}
	
	// DELETE: status/{id}
	[HttpDelete("{id}")]
	public async Task<ActionResult> DeleteStatusById(int id)
	{
		await _statusService.DeleteByIdAsync(id);
		
		return Ok();
	}
}