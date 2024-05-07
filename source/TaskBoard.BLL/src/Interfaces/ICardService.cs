using TaskBoard.BLL.DTOs;

namespace TaskBoard.BLL.Interfaces;

public interface ICardService : ICrud<CardDTO>
{
	Task<CardDTO> GetByIdWithoutTrackingAsync(int id);
	
	Task<CardDTO> GetByIdWithDetailsAsync(int id);
	
	Task<CardDTO> GetLastAsync();
	
	Task ChangeStatus(int cardId, int statusId);
}