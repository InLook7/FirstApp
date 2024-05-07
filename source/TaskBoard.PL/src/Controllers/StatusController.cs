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
	
	// GET: status/
	[HttpGet]
	public async Task<ActionResult<IEnumerable<StatusDTO>>> GetAllStatuses()
	{
		var statuses = await _statusService.GetAllAsync();
		
		return Ok(statuses);
	}
	
	// GET: status/{statusId}
	[HttpGet("{statusId}")]
	public async Task<ActionResult<IEnumerable<StatusDTO>>> GetStatusById(int statusId)
	{
		var status = await _statusService.GetByIdAsync(statusId);
		
		return Ok(status);
	}
	
	// POST: status/
	[HttpPost]
	public async Task<ActionResult> AddStatus([FromBody] StatusDTO status)
	{
		await _statusService.AddAsync(status);
		
		return Ok();
	}
	
	// PUT: status/
	[HttpPut]
	public async Task<ActionResult> UpdateStatus([FromBody] StatusDTO status)
	{
		await _statusService.UpdateAsync(status);
		
		return Ok();
	}
	
	// DELETE: status/{id}
	[HttpDelete("{id}")]
	public async Task<ActionResult> DeleteStatusById(int id)
	{
		await _statusService.DeleteByIdAsync(id);
		
		return Ok();
	}
}