namespace TaskBoard.DAL.Entities;

public class Board : BaseEntity
{
	public string Name { get; set; }
	
	public IEnumerable<Status> Statuses { get; set; }
	public IEnumerable<Activity> Activities { get; set; }
}