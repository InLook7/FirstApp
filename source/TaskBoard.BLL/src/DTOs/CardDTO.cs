namespace TaskBoard.BLL.DTOs;

public class CardDTO : BaseDTO
{
	public string Name { get; set; }
	public int BoardId { get; set; }
	public int StatusId { get; set; }
	public DateTime DueDate { get; set; }
	public string Description { get; set; }
	public int PriorityId { get; set; }
	public string? PriorityName { get; set; }
}