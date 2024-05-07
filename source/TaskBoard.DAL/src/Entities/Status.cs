namespace TaskBoard.DAL.Entities;

public class Status : BaseEntity
{
	public string Name { get; set; }
	
	public IEnumerable<Card> Cards { get; set; }
}