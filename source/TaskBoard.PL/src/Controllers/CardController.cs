using Microsoft.AspNetCore.Mvc;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;

namespace TaskBoard.PL.Controllers;

[ApiController]
[Route("[controller]")]
public class CardController : ControllerBase
{
	private readonly ICardService _cardService;
	private readonly IStatusService _statusService;
	private readonly IActivityService _activityService;
	
	public CardController(ICardService cardService, IStatusService statusService, IActivityService activityService)
	{
		_cardService = cardService;
		_statusService = statusService;
		_activityService = activityService;
	}
	
	// GET: card/
	[HttpGet]
	public async Task<ActionResult<IEnumerable<CardDTO>>> GetAllCards()
	{
		var cards = await _cardService.GetAllAsync();
		
		return Ok(cards);
	}
	
	// POST: card/
	[HttpPost]
	public async Task<ActionResult> AddCard([FromBody] CardDTO card)
	{
		await _cardService.AddAsync(card);
		
		var newCard = await _cardService.GetLastAsync();
		await _activityService.AddCreateLog(newCard);
		
		return Ok();
	}
	
	// PUT: card/
	[HttpPut]
	public async Task<ActionResult> UpdateCard([FromBody] CardDTO card)
	{
		var previousCard = await _cardService.GetByIdWithoutTrackingAsync(card.Id);
		var status = await _statusService.GetByIdAsync(card.StatusId);
	
		await _cardService.UpdateAsync(card);
		
		var updatedCard = await _cardService.GetByIdWithDetailsAsync(card.Id);
		await _activityService.AddUpdateLog(previousCard, updatedCard, status.Name);
		
		return Ok();
	}
	
	// DELETE: card/{cardId}
	[HttpDelete("{cardId}")]
	public async Task<ActionResult> DeleteCardById(int cardId)
	{
		var card = await _cardService.GetByIdAsync(cardId);
		
		await _cardService.DeleteByIdAsync(cardId);

		await _activityService.AddDeleteLog(card);
		
		return Ok();
	}
	
	// POST: card/changeStatus/{cardId}/{statusId}
	[HttpPost("changeStatus/{cardId}/{statusId}")]
	public async Task<ActionResult> ChangeStatusCard(int cardId, int statusId)
	{
		var card = await _cardService.GetByIdAsync(cardId);
		var status = await _statusService.GetByIdAsync(statusId);
		
		await _cardService.ChangeStatus(cardId, statusId);
		
		await _activityService.AddMoveLog(card, status.Name);
		
		return Ok();
	}
}