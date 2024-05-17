using TaskBoard.DAL.Entities;

namespace TaskBoard.DAL.Interfaces.RepositoryInterfaces;

public interface IRepository<TEntity> where TEntity : BaseEntity
{
	Task<IEnumerable<TEntity>> GetAllAsync();
	
	Task<TEntity?> GetByIdAsync(int id);
	
	Task<TEntity?> AddSync(TEntity entity);
	
	TEntity? Update(TEntity entity);
	
	void Delete(TEntity entity);
	
	Task DeleteByIdAsync(int id);
}