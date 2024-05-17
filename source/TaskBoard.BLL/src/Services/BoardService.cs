using AutoMapper;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;
using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Interfaces;

namespace TaskBoard.BLL.Services;

public class BoardService : IBoardService
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IMapper _mapper;
	
	public BoardService(IUnitOfWork unitOfWork, IMapper mapper)
	{
		_unitOfWork = unitOfWork;
		_mapper = mapper;
	}
	
	public async Task<IEnumerable<BoardDTO>> GetAllAsync()
	{
		var boards = await _unitOfWork.BoardRepository.GetAllAsync();
		
		boards = boards.OrderBy(s => s.Id);
		
		return _mapper.Map<IEnumerable<BoardDTO>>(boards);
	}

	public async Task<BoardDTO> GetByIdAsync(int id)
	{
		var board = await _unitOfWork.BoardRepository.GetByIdAsync(id);
		
		return _mapper.Map<BoardDTO>(board);
	}
	
	public async Task<BoardDTO> AddAsync(BoardDTO dto)
	{
		var board = _mapper.Map<Board>(dto);
		
		board = await _unitOfWork.BoardRepository.AddSync(board);
		await _unitOfWork.SaveAsync();
		return _mapper.Map<BoardDTO>(board);
	}
	
	public async Task<BoardDTO> UpdateAsync(BoardDTO dto)
	{
		var board = _mapper.Map<Board>(dto);
		
		board = _unitOfWork.BoardRepository.Update(board);
		await _unitOfWork.SaveAsync();
		return _mapper.Map<BoardDTO>(board);
	}

	public async Task DeleteByIdAsync(int id)
	{
		await _unitOfWork.BoardRepository.DeleteByIdAsync(id);
		await _unitOfWork.SaveAsync();
	}  
}