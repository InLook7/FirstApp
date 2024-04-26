using TaskBoard.DAL.Entities;

namespace TaskBoard.DAL.Interfaces.RepositoryInterfaces;

public interface IRepository<TEntity> where TEntity : BaseEntity
{
	Task<IEnumerable<TEntity>> GetAllAsync();
	
	Task<TEntity?> GetByIdAsync(int id);
	
	Task AddSync(TEntity entity);
	
	void Update(TEntity entity);
	
	void Delete(TEntity entity);
	
	Task DeleteByIdAsync(int id);
}