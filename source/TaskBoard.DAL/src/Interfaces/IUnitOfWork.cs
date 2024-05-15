using TaskBoard.DAL.Interfaces.RepositoryInterfaces;

namespace TaskBoard.DAL.Interfaces;

public interface IUnitOfWork 
{
	ICardRepository CardRepository { get; }
	IStatusRepository StatusRepository { get; }
	IPriorityRepository PriorityRepository { get; }
	IActivityRepository ActivityRepository { get; }
	IBoardRepository BoardRepository { get; }
	
	Task SaveAsync();
}