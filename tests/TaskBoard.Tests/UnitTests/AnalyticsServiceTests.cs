using Xunit;
using Moq;
using TaskBoard.BLL.Interfaces;
using TaskBoard.BLL.Services;
using TaskBoard.DAL.Interfaces;
using TaskBoard.DAL.Entities;

namespace TaskBoard.Tests.UnitTests;

public class AnalyticsServiceTests
{
	private readonly Mock<IUnitOfWork> _unitOfWorkMock;
	private readonly IAnalyticsService _analyticsService;
	
	public AnalyticsServiceTests()
	{
		_unitOfWorkMock = new Mock<IUnitOfWork>();
		
		_analyticsService = new AnalyticsService(_unitOfWorkMock.Object);
	}
	
	[Fact]
	public async Task CountCardsByStatuses_Count_ReturnsCountCards()
	{
		// arrange
		var cards = new List<Card> 
		{
			new Card { Name = "HelloWorldCard", StatusId = 1, DueDate = DateTime.Parse("2024-05-01").ToUniversalTime(), Description = "First task ever", PriorityId = 3 },
			new Card { Name = "Something important", StatusId = 1, DueDate = DateTime.Parse("2024-05-02").ToUniversalTime(), Description = "Important things", PriorityId = 2 },
			new Card { Name = "Unicorn Wrangling", StatusId = 2, DueDate = DateTime.Parse("2024-05-02").ToUniversalTime(), Description = "Capture escaped unicorns in the office", PriorityId = 3 },
		};
		
		var statuses = new List<Status>
		{
			new Status { Id = 1, Name = "Status1", BoardId = 1 },
			new Status { Id = 2, Name = "Status2", BoardId = 1 }
		};
			
		_unitOfWorkMock.Setup(u => u.CardRepository.GetAllAsync()).ReturnsAsync(cards);
		_unitOfWorkMock.Setup(u => u.StatusRepository.GetAllAsync()).ReturnsAsync(statuses);

		// act
		var counts = await _analyticsService.CountCardsByStatuses();

		// assert
		_unitOfWorkMock.Verify(u => u.CardRepository.GetAllAsync(), Times.Once);
		_unitOfWorkMock.Verify(u => u.StatusRepository.GetAllAsync(), Times.Once);
		Assert.Equal(cards.Where(c => c.StatusId == 1).Count(), 
			counts.SingleOrDefault(c => c.StatusId == 1).CountCards);
		Assert.Equal(cards.Where(c => c.StatusId == 2).Count(), 
			counts.SingleOrDefault(c => c.StatusId == 2).CountCards);
	}
}