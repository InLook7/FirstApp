namespace TaskBoard.DAL.Entities;

public class Priority : BaseEntity
{
	public string Name { get; set; }
	
	public IEnumerable<Card> Cards { get; set; }
}