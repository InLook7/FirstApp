using AutoMapper;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;
using TaskBoard.DAL.Interfaces;

namespace TaskBoard.BLL.Services;

public class AnalyticsService : IAnalyticsService
{
	private readonly IUnitOfWork _unitOfWork;
	
	public AnalyticsService(IUnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}
	
	public async Task<IEnumerable<CountCardsDTO>> CountCardsByStatuses()
	{
		var cards = await _unitOfWork.CardRepository.GetAllAsync();
		var statuses = await _unitOfWork.StatusRepository.GetAllAsync();
		
		var counts = statuses
			.GroupJoin(cards,
				status => status.Id,
				card => card.StatusId,
				(status, cardGroup) => new CountCardsDTO
				{
					StatusId = status.Id,
					CountCards = cardGroup.Count()
				})
			.ToList();
					
		return counts;
	}
}
