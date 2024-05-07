using Microsoft.EntityFrameworkCore;
using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Infrastructure;
using TaskBoard.DAL.Interfaces.RepositoryInterfaces;

namespace TaskBoard.DAL.Repositories;

public class CardRepository : Repository<Card>, ICardRepository
{
	public CardRepository(AppDbContext context) : base(context)
	{}
	
	public async Task<IEnumerable<Card>> GetAllWithDetailsAsync()
	{
		return await _dbSet
			.Include(s => s.Priority)
			.ToListAsync();
	}
	
	public async Task<Card> GetByIdWithDetailsAsync(int id)
	{
		return await _dbSet
			.Include(s => s.Priority)
			.SingleOrDefaultAsync(c => c.Id == id);
	}
	
	public async Task<Card> GetByIdWithDetailsWithoutTrackingAsync(int id)
	{
		return await _dbSet
			.AsNoTracking()
			.Include(s => s.Priority)
			.SingleOrDefaultAsync(c => c.Id == id);
	}
}