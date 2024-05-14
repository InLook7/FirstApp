using TaskBoard.BLL.DTOs;

namespace TaskBoard.BLL.Interfaces;

public interface IActivityService
{
	Task<IEnumerable<ActivityDTO>> GetLogsByBoardId(int id);
	Task<IEnumerable<ActivityDTO>> GetLogsByCardId(int id);
	Task AddCreateLog(CardDTO card);
	Task AddUpdateLog(CardDTO previousCard, CardDTO card, string statusName);
	Task AddMoveLog(CardDTO card, string statusName);
	Task AddDeleteLog(CardDTO card);
}