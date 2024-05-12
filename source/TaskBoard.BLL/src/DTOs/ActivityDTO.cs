namespace TaskBoard.BLL.DTOs;

public class ActivityDTO : BaseDTO
{
	public int BoardId { get; set; }
	public int CardId { get; set; }
	public DateTime Date { get; set; }
	public string Details { get; set; }
}