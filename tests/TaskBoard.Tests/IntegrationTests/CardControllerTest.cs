using Xunit;
using System.Text;
using System.Text.Json;
using TaskBoard.BLL.DTOs;

namespace TaskBoard.Tests.IntegrationTests;

public class CardControllerTest : IDisposable
{
	private readonly CustomWebApplicationFactory _factory;
	private readonly HttpClient _client;
	private const string RequestUri = "card/";
	
	public CardControllerTest()
	{
		_factory = new CustomWebApplicationFactory();
		_client = _factory.CreateClient();
	}
	
	[Fact]
	public async Task AddCard_AddCardToDb_ReturnsSuccessfulProcess()
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

		// act
		var content = new StringContent(JsonSerializer.Serialize(dto), Encoding.UTF8, "application/json");
		var httpResponse = await _client.PostAsync(RequestUri, content);

		// assert
		httpResponse.EnsureSuccessStatusCode();
		var addedCard = await TestHelper.GetAddedCardFromDatabaseAsync(_factory);

		Assert.NotNull(addedCard);
		Assert.Equal(dto.Name, addedCard.Name);
	}
	
	[Fact]
	public async Task UpdateCard_UpdateCardFromDb_ReturnsSuccessfulProcess()
	{
		// arrange
		var dto = new CardDTO
		{
			Id = 1,
			Name = "Updated Card",
			BoardId = 1,
			StatusId = 1,
			DueDate = DateTime.Parse("2024-05-01").ToUniversalTime(),
			Description = "Updated Description",
			PriorityId = 1
		};

		// act
		var content = new StringContent(JsonSerializer.Serialize(dto), Encoding.UTF8, "application/json");
		var httpResponse = await _client.PutAsync(RequestUri, content);

		// assert
		httpResponse.EnsureSuccessStatusCode();
		var updatedCard = await TestHelper.GetUpdatedCardFromDatabaseAsync(_factory, dto.Id);

		Assert.NotNull(updatedCard);
		Assert.Equal(dto.Name, updatedCard.Name);
	}
	
	[Fact]
	public async Task DeleteCardById_DeleteCardFromDb_ReturnsSuccessfulProcess()
	{
		// arrange
		int cardId = 2;

		// act
		var httpResponse = await _client.DeleteAsync(RequestUri + cardId);

		// assert
		httpResponse.EnsureSuccessStatusCode();
		var check = await TestHelper.CheckIfCardExists(_factory, cardId);

		Assert.False(check);
	}
	
	[Fact]
	public async Task ChangeStatusCard_ChangeStatusCardFromDb_ReturnsSuccessfulProcess()
	{
		// arrange
		int cardId = 1;
		int statusId = 2;

		// act
		var httpResponse = await _client.PostAsync(RequestUri + $"changeStatus/{cardId}/{statusId}", null);

		// assert
		httpResponse.EnsureSuccessStatusCode();
		var updatedCard = await TestHelper.GetUpdatedCardFromDatabaseAsync(_factory, cardId);

		Assert.NotNull(updatedCard);
		Assert.Equal(statusId, updatedCard.StatusId);
	}

	public void Dispose()
	{
		_client.Dispose();
		_factory.Dispose();
	}
}