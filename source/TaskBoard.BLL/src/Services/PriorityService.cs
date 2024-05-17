using AutoMapper;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;
using TaskBoard.BLL.Validators;
using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Interfaces;

namespace TaskBoard.BLL.Services;

public class PriorityService : IPriorityService
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;
	private readonly PriorityDTOValidator _validator;
	
	public PriorityService(IUnitOfWork unitOfWork, IMapper mapper, PriorityDTOValidator validator)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
		_validator = validator;
	}
	
	public async Task<IEnumerable<PriorityDTO>> GetAllAsync()
	{
		var priorities = await _unitOfWork.PriorityRepository.GetAllAsync();
		
		return _mapper.Map<IEnumerable<PriorityDTO>>(priorities);
	}

	public async Task<PriorityDTO> GetByIdAsync(int id)
	{
		var priority = await _unitOfWork.PriorityRepository.GetByIdAsync(id);
		
		return _mapper.Map<PriorityDTO>(priority);
	}
	
	public async Task<PriorityDTO> AddAsync(PriorityDTO dto)
	{
		_validator.Validate(dto);
		var priority = _mapper.Map<Priority>(dto);
		
		priority = await _unitOfWork.PriorityRepository.AddSync(priority);
		await _unitOfWork.SaveAsync();
		return _mapper.Map<PriorityDTO>(priority);
	}
	
	public async Task<PriorityDTO> UpdateAsync(PriorityDTO dto)
	{
		_validator.Validate(dto);
		var priority = _mapper.Map<Priority>(dto);
		
		priority = _unitOfWork.PriorityRepository.Update(priority);
		await _unitOfWork.SaveAsync();
		return _mapper.Map<PriorityDTO>(priority);
	}

	public async Task DeleteByIdAsync(int id)
	{
		await _unitOfWork.PriorityRepository.DeleteByIdAsync(id);
		await _unitOfWork.SaveAsync();
	}
}