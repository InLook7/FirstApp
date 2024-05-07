using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Infrastructure;
using TaskBoard.DAL.Interfaces.RepositoryInterfaces;

namespace TaskBoard.DAL.Repositories;

public class PriorityRepository : Repository<Priority>, IPriorityRepository
{
    public PriorityRepository(AppDbContext context) : base(context)
    {}
}