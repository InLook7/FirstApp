using AutoMapper;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;
using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Interfaces;

namespace TaskBoard.BLL.Services;

public class ActivityService : IActivityService
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;
	
	public ActivityService(IUnitOfWork unitOfWork, IMapper mapper)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
	}
	
	public async Task<IEnumerable<ActivityDTO>> GetLastLogsByBoardId(int boardId, int count)
	{
		var logs = await _unitOfWork.ActivityRepository.GetAllAsync();
		var skip = count * 20;
		
		logs = logs
			.Where(l => l.BoardId == boardId)
			.OrderByDescending(l => l.Date)
			.Skip(skip)
			.Take(20);
		
		return _mapper.Map<IEnumerable<ActivityDTO>>(logs);
	}
	
	public async Task<IEnumerable<ActivityDTO>> GetLastLogsByCardId(int id, int count)
	{
		var logs = await _unitOfWork.ActivityRepository.GetAllAsync();
		var skip = count * 20;
		
		logs = logs
			.Where(l => l.CardId == id)
			.OrderByDescending(l => l.Date)
			.Skip(skip)
			.Take(20);
		
		return _mapper.Map<IEnumerable<ActivityDTO>>(logs);
	}
	
	public async Task AddCreateLog(CardDTO card)
	{
		var log = new Activity
		{
			BoardId = card.BoardId,
			CardId = card.Id,
			Details = $"You created ///{card.Name}///",
			Date = DateTime.UtcNow
		};
		
		await _unitOfWork.ActivityRepository.AddSync(log);
		await _unitOfWork.SaveAsync();
	}
	
	public async Task AddUpdateLog(CardDTO previousCard, CardDTO card, string statusName)
	{	
		if (previousCard.Name != card.Name)
		{
			var log = new Activity
			{
				BoardId = card.BoardId,
				CardId = card.Id,
				Details = $"You renamed ///{previousCard.Name}/// to ///{card.Name}///",
				Date = DateTime.UtcNow
			};
			await _unitOfWork.ActivityRepository.AddSync(log);
		}
		if (previousCard.DueDate != card.DueDate) 
		{
			var log = new Activity
			{
				BoardId = card.BoardId,
				CardId = card.Id,
				Details = $"You changed the date ///{card.Name}///",
				Date = DateTime.UtcNow
			};
			await _unitOfWork.ActivityRepository.AddSync(log);
		}
		if (previousCard.PriorityId != card.PriorityId) 
		{
			var log = new Activity
			{
				BoardId = card.BoardId,
				CardId = card.Id,
				Details = $"You changed the priority ///{card.Name}/// from %%%{previousCard.PriorityName}%%% to %%%{card.PriorityName}%%%",
				Date = DateTime.UtcNow
			};
			await _unitOfWork.ActivityRepository.AddSync(log);
		}
		if (previousCard.Description != card.Description) 
		{
			var log = new Activity
			{
				BoardId = card.BoardId,
				CardId = card.Id,
				Details = $"You changed the description ///{card.Name}///",
				Date = DateTime.UtcNow
			};
			await _unitOfWork.ActivityRepository.AddSync(log);
		}
		if (previousCard.StatusId != card.StatusId) 
		{
			var log = new Activity
			{
				BoardId = card.BoardId,
				CardId = card.Id,
				Details = $"You moved ///{card.Name}/// to %%%{statusName}%%%",
				Date = DateTime.UtcNow
			};
			await _unitOfWork.ActivityRepository.AddSync(log);
		}

		await _unitOfWork.SaveAsync();
	}
	
	public async Task AddMoveLog(CardDTO card, string statusName)
	{
		var log = new Activity
		{
			BoardId = card.BoardId,
			CardId = card.Id,
			Details = $"You moved ///{card.Name}/// to %%%{statusName}%%%",
			Date = DateTime.UtcNow
		};
		
		await _unitOfWork.ActivityRepository.AddSync(log);
		await _unitOfWork.SaveAsync();
	}

	public async Task AddDeleteLog(CardDTO card)
	{
		var log = new Activity
		{
			BoardId = card.BoardId,
			CardId = card.Id,
			Details = $"You deleted ///{card.Name}///",
			Date = DateTime.UtcNow
		};
		
		await _unitOfWork.ActivityRepository.AddSync(log);
		await _unitOfWork.SaveAsync();
	}
}