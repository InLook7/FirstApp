using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Infrastructure;
using TaskBoard.DAL.Interfaces.RepositoryInterfaces;

namespace TaskBoard.DAL.Repositories;

public class ActivityRepository : Repository<Activity>, IActivityRepository
{
    public ActivityRepository(AppDbContext context) : base(context)
    {}
}