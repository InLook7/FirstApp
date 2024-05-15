namespace TaskBoard.DAL.Entities;

public class Activity : BaseEntity
{
	public int BoardId { get; set; }
	public int CardId { get; set; }
	public DateTime Date { get; set; }
	public string Details { get; set; }
	
	public Board Board { get; set; }
}