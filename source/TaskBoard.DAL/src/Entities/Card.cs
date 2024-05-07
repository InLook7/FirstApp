namespace TaskBoard.DAL.Entities;

public class Card : BaseEntity
{
	public string Name { get; set; }
	public int StatusId { get; set; }
	public DateTime DueDate { get; set; }
	public int PriorityId { get; set; }
	public string Description { get; set; }
	
	public Status Status { get; set; } 
	public Priority Priority { get; set; }
}