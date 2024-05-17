using AutoMapper;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;
using TaskBoard.BLL.Validators;
using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Interfaces;

namespace TaskBoard.BLL.Services;

public class CardService : ICardService
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;
	private readonly CardDTOValidator _validator;
	
	public CardService(IUnitOfWork unitOfWork, IMapper mapper, CardDTOValidator validator)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
		_validator = validator;
	}
	
	public async Task<IEnumerable<CardDTO>> GetAllAsync()
	{
		var cards = await _unitOfWork.CardRepository.GetAllWithDetailsAsync();
		
		cards = cards.OrderByDescending(c => c.DueDate);
		
		return _mapper.Map<IEnumerable<CardDTO>>(cards);
	}
	
	public async Task<CardDTO> GetByIdAsync(int id)
	{
		var card = await _unitOfWork.CardRepository.GetByIdAsync(id);
		
		return _mapper.Map<CardDTO>(card);
	}
	
	public async Task<CardDTO> GetByIdWithDetailsAsync(int id)
	{
		var card = await _unitOfWork.CardRepository.GetByIdWithDetailsAsync(id);
		
		return _mapper.Map<CardDTO>(card);
	}
	
	public async Task<CardDTO> GetByIdWithoutTrackingAsync(int id)
	{
		var card = await _unitOfWork.CardRepository.GetByIdWithDetailsWithoutTrackingAsync(id);
		
		return _mapper.Map<CardDTO>(card);
	}
	
	public async Task<CardDTO> GetLastAsync()
	{
		var cards = await _unitOfWork.CardRepository.GetAllWithDetailsAsync();
		
		var lastCard = cards
			.OrderByDescending(c => c.Id)
			.FirstOrDefault();
		
		return _mapper.Map<CardDTO>(lastCard);
	}
	
	public async Task<CardDTO> AddAsync(CardDTO dto)
	{
		_validator.Validate(dto);
		var card = _mapper.Map<Card>(dto);
		
		card = await _unitOfWork.CardRepository.AddSync(card);
		await _unitOfWork.SaveAsync();
		
		card = await _unitOfWork.CardRepository.GetByIdWithDetailsAsync(card.Id);
		return _mapper.Map<CardDTO>(card);
	}

	public async Task<CardDTO> UpdateAsync(CardDTO dto)
	{
		_validator.Validate(dto);
		var card = _mapper.Map<Card>(dto);
		
		card = _unitOfWork.CardRepository.Update(card);
		await _unitOfWork.SaveAsync();
		
		card = await _unitOfWork.CardRepository.GetByIdWithDetailsAsync(card.Id);
		return _mapper.Map<CardDTO>(card);
	}

	public async Task DeleteByIdAsync(int id)
	{
		await _unitOfWork.CardRepository.DeleteByIdAsync(id);
		await _unitOfWork.SaveAsync();
	}
	
	public async Task ChangeStatus(int cardId, int statusId)
	{
		var card = await _unitOfWork.CardRepository.GetByIdAsync(cardId);
		
		if (card != null)
		{
			card.StatusId = statusId;
		}
		await _unitOfWork.SaveAsync();
	}
}