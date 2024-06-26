using Microsoft.EntityFrameworkCore;
using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Infrastructure;
using TaskBoard.DAL.Interfaces.RepositoryInterfaces;

namespace TaskBoard.DAL.Repositories;

public class Repository<TEntity> : IRepository<TEntity> where TEntity : BaseEntity
{
	protected readonly DbSet<TEntity> _dbSet;

	public Repository(AppDbContext context)
	{
		_dbSet = context.Set<TEntity>();
	}
	
	public async Task<IEnumerable<TEntity>> GetAllAsync()
	{
		return await _dbSet.ToListAsync();
	}
	
	public async Task<TEntity?> GetByIdAsync(int id)
	{
		return await _dbSet.FindAsync(id);
	}
	
	public async Task<TEntity?> AddSync(TEntity entity)
	{
		await _dbSet.AddAsync(entity);
		return entity;
	}

	public TEntity Update(TEntity entity)
	{
		_dbSet.Update(entity);
		return entity;
	}
	
	public void Delete(TEntity entity)
	{
		_dbSet.Remove(entity);
	}

	public async Task DeleteByIdAsync(int id)
	{	
		var entity = await _dbSet.FindAsync(id);
		if (entity != null)
		{
			_dbSet.Remove(entity);
		}
	}
}