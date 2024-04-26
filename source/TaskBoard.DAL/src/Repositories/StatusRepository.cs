using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Infrastructure;
using TaskBoard.DAL.Interfaces.RepositoryInterfaces;

namespace TaskBoard.DAL.Repositories;

public class StatusRepository : Repository<Status>, IStatusRepository
{
    public StatusRepository(AppDbContext context) : base(context)
    {}
}