using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Infrastructure;
using TaskBoard.DAL.Interfaces.RepositoryInterfaces;

namespace TaskBoard.DAL.Repositories;

public class BoardRepository : Repository<Board>, IBoardRepository
{
    public BoardRepository(AppDbContext context) : base(context)
    {}
}