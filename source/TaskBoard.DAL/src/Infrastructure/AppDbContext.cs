using Microsoft.EntityFrameworkCore;
using TaskBoard.DAL.Entities;

namespace TaskBoard.DAL.Infrastructure;

public class AppDbContext : DbContext
{
	public AppDbContext()
	{}
	
	public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
	{}
	
	public DbSet<Card> Cards { get; set; }
	public DbSet<Status> Statuses { get; set; }
	public DbSet<Priority> Priorities { get; set; }
	public DbSet<Activity> Activities { get; set; }
}