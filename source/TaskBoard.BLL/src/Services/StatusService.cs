using AutoMapper;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;
using TaskBoard.BLL.Validators;
using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Interfaces;

namespace TaskBoard.BLL.Services;

public class StatusService : IStatusService
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;
	private readonly StatusDTOValidator _validator;
	
	public StatusService(IUnitOfWork unitOfWork, IMapper mapper, StatusDTOValidator validator)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
		_validator = validator;
	}
	
	public async Task<IEnumerable<StatusDTO>> GetAllAsync()
	{
		var statuses = await _unitOfWork.StatusRepository.GetAllAsync();
		
		statuses = statuses.OrderBy(s => s.Id);
		
		return _mapper.Map<IEnumerable<StatusDTO>>(statuses);
	}
	
	public async Task<StatusDTO> GetByIdAsync(int id)
	{
		var status = await _unitOfWork.StatusRepository.GetByIdAsync(id);
		
		return _mapper.Map<StatusDTO>(status);
	}
	
	public async Task AddAsync(StatusDTO dto)
	{
		_validator.Validate(dto);
		var status = _mapper.Map<Status>(dto);
		
		await _unitOfWork.StatusRepository.AddSync(status);
		await _unitOfWork.SaveAsync();
	}
	
	public async Task UpdateAsync(StatusDTO dto)
	{
		_validator.Validate(dto);
		var status = _mapper.Map<Status>(dto);
		
		_unitOfWork.StatusRepository.Update(status);
		await _unitOfWork.SaveAsync();
	}

	public async Task DeleteByIdAsync(int id)
	{
		await _unitOfWork.StatusRepository.DeleteByIdAsync(id);
	}
}