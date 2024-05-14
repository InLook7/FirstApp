using Xunit;
using Moq;
using AutoMapper;
using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;
using TaskBoard.BLL.Services;
using TaskBoard.BLL.Validators;
using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Interfaces;

namespace TaskBoard.Tests.UnitTests;

public class CardServiceTests
{
	private readonly Mock<IUnitOfWork> _unitOfWorkMock;
	private readonly IMapper _mapper;
	private readonly CardDTOValidator _validator;
	private readonly ICardService _cardService;
	
	public CardServiceTests()
	{
		_unitOfWorkMock = new Mock<IUnitOfWork>();
		_mapper = TestHelper.ConfigureMapper();
		_validator = new CardDTOValidator();
		
		_cardService = new CardService(_unitOfWorkMock.Object, _mapper, _validator);
	}
	
	[Fact]
	public async Task AddAsync_AddCard_ReturnsSuccessfulProcess()
	{
		// arrange
		var dto = new CardDTO
		{
			Name = "Test Card",
			BoardId = 1,
			StatusId = 1,
			DueDate = DateTime.Parse("2024-05-01").ToUniversalTime(),
			Description = "Test Description",
			PriorityId = 1
		};
			
		_unitOfWorkMock.Setup(u => u.CardRepository.AddSync(It.IsAny<Card>()));

		// act
		await _cardService.AddAsync(dto);

		// assert
		_unitOfWorkMock.Verify(u => u.CardRepository.AddSync(It.Is<Card>(c => c.Id == dto.Id && c.Name == dto.Name)), Times.Once);
		_unitOfWorkMock.Verify(u => u.SaveAsync(), Times.Once);
	}
	
	[Fact]
	public async Task UpdateAsync_UpdateCard_ReturnsSuccessfulProcess()
	{
		// arrange
		var dto = new CardDTO
		{
			Id = 1,
			Name = "Test Card",
			BoardId = 1,
			StatusId = 1,
			DueDate = DateTime.Parse("2024-05-01").ToUniversalTime(),
			Description = "Test Description",
			PriorityId = 1
		};
			
		_unitOfWorkMock.Setup(u => u.CardRepository.Update(It.IsAny<Card>()));

		// act
		await _cardService.UpdateAsync(dto);

		// assert
		_unitOfWorkMock.Verify(u => u.CardRepository.Update(It.Is<Card>(c => c.Id == dto.Id && c.Name == dto.Name)), Times.Once);
		_unitOfWorkMock.Verify(u => u.SaveAsync(), Times.Once);
	}
	
	[Fact]
	public async Task DeleteByIdAsync_DeleteCard_ReturnsSuccessfulProcess()
	{
		// arrange
		int cardId = 1;
			
		_unitOfWorkMock.Setup(u => u.CardRepository.DeleteByIdAsync(It.IsAny<int>()));

		// act
		await _cardService.DeleteByIdAsync(cardId);

		// assert
		_unitOfWorkMock.Verify(u => u.CardRepository.DeleteByIdAsync(cardId), Times.Once);
		_unitOfWorkMock.Verify(u => u.SaveAsync(), Times.Once);
	}
	
	[Fact]
	public async Task ChangeStatus_ChangeStatusCard_ReturnsSuccessfulProcess()
	{
		// arrange
		var card = new Card
		{
			Id = 1,
			Name = "Test Card",
			StatusId = 1,
			DueDate = DateTime.Parse("2024-05-01").ToUniversalTime(),
			Description = "Test Description",
			PriorityId = 1
		};
		int statusId = 2;
			
		_unitOfWorkMock.Setup(u => u.CardRepository.GetByIdAsync(It.IsAny<int>()))
			.ReturnsAsync(card);

		// act
		await _cardService.ChangeStatus(card.Id, statusId);

		// assert
		_unitOfWorkMock.Verify(u => u.CardRepository.GetByIdAsync(card.Id), Times.Once);
		_unitOfWorkMock.Verify(u => u.SaveAsync(), Times.Once);
		Assert.Equal(statusId, card.StatusId);
	}
	
	[Fact]
	public async Task GetAllAsync_GetAllCards_ReturnsAllCards()
	{
		// arrange
		var expected = new List<Card> 
		{
			new Card { Name = "HelloWorldCard", StatusId = 4, DueDate = DateTime.Parse("2024-05-01").ToUniversalTime(), Description = "First task ever", PriorityId = 3 },
			new Card { Name = "Something important", StatusId = 4, DueDate = DateTime.Parse("2024-05-02").ToUniversalTime(), Description = "Important things", PriorityId = 2 },
			new Card { Name = "Unicorn Wrangling", StatusId = 3, DueDate = DateTime.Parse("2024-05-02").ToUniversalTime(), Description = "Capture escaped unicorns in the office", PriorityId = 3 },
		};

		_unitOfWorkMock.Setup(u => u.CardRepository.GetAllWithDetailsAsync())
			.ReturnsAsync(expected);

		// act
		var actual = await _cardService.GetAllAsync();

		// assert
		_unitOfWorkMock.Verify(u => u.CardRepository.GetAllWithDetailsAsync(), Times.Once);
		Assert.NotNull(actual);
		Assert.Equal(expected.Count, actual.Count());
	}
}