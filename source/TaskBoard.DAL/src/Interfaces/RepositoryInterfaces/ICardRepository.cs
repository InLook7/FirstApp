using TaskBoard.DAL.Entities;

namespace TaskBoard.DAL.Interfaces.RepositoryInterfaces;

public interface ICardRepository : IRepository<Card>
{   
	Task<IEnumerable<Card>> GetAllWithDetailsAsync();
	
	Task<Card> GetByIdWithDetailsAsync(int id);
	
	Task<Card> GetByIdWithDetailsWithoutTrackingAsync(int id);
}