namespace TaskBoard.BLL.DTOs;

public class ActivityDTO : BaseDTO
{
    public int CardId { get; set; }
	public DateTime Date { get; set; }
	public string Details { get; set; }
}