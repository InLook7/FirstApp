using TaskBoard.DAL.Interfaces;
using TaskBoard.DAL.Interfaces.RepositoryInterfaces;
using TaskBoard.DAL.Repositories;

namespace TaskBoard.DAL.Infrastructure;

public class UnitOfWork : IUnitOfWork
{
	private readonly AppDbContext _context;
	
	public UnitOfWork(AppDbContext context)
	{
		_context = context;
		CardRepository = new CardRepository(context);
		StatusRepository = new StatusRepository(context);
		PriorityRepository = new PriorityRepository(context);
		ActivityRepository = new ActivityRepository(context);
	}
	
	public ICardRepository CardRepository { get; }
	public IStatusRepository StatusRepository { get; }
	public IPriorityRepository PriorityRepository { get; }
	public IActivityRepository ActivityRepository { get; }

	public async Task SaveAsync()
	{
		await _context.SaveChangesAsync();
	}
}