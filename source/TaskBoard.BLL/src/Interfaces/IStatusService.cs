using TaskBoard.BLL.DTOs;

namespace TaskBoard.BLL.Interfaces;

public interface IStatusService : ICrud<StatusDTO>
{
	Task<IEnumerable<StatusDTO>> GetStatusesByBoardId(int boardId);
}