using Microsoft.AspNetCore.Mvc;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;

namespace TaskBoard.PL.Controllers;

[ApiController]
[Route("[controller]")]
public class BoardController : ControllerBase
{
	private readonly IBoardService _boardService;
	
	public BoardController(IBoardService boardService)
	{
		_boardService = boardService;
	}
	
	// GET: board/
	[HttpGet]
	public async Task<ActionResult<IEnumerable<BoardDTO>>> GetAllBoards()
	{
		var boards = await _boardService.GetAllAsync();
		
		return Ok(boards);
	}
	
	// POST: board/
	[HttpPost]
	public async Task<ActionResult> AddBoard([FromBody] BoardDTO board)
	{
		board = await _boardService.AddAsync(board);
		
		return Ok(board);
	}
	
	// PUT: board/
	[HttpPut]
	public async Task<ActionResult> UpdateBoard([FromBody] BoardDTO board)
	{
		board = await _boardService.UpdateAsync(board);
		
		return Ok(board);
	}
	
	// DELETE: board/{id}
	[HttpDelete("{id}")]
	public async Task<ActionResult> DeleteBoardById(int id)
	{
		await _boardService.DeleteByIdAsync(id);
		
		return Ok();
	}
}