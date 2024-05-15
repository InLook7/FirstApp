using TaskBoard.BLL.DTOs;

namespace TaskBoard.BLL.Interfaces;

public interface IActivityService
{
	Task<IEnumerable<ActivityDTO>> GetLastLogsByBoardId(int id, int count);
	
	Task<IEnumerable<ActivityDTO>> GetLastLogsByCardId(int id, int count);
	
	Task AddCreateLog(CardDTO card);
	
	Task AddUpdateLog(CardDTO previousCard, CardDTO card, string statusName);
	
	Task AddMoveLog(CardDTO card, string statusName);
	
	Task AddDeleteLog(CardDTO card);
}