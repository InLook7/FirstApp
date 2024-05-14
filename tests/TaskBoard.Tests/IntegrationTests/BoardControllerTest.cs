using Xunit;
using TaskBoard.BLL.DTOs;
using System.Text.Json;
using System.Text;

namespace TaskBoard.Tests.IntegrationTests;

public class BoardControllerTest : IDisposable
{
	private readonly CustomWebApplicationFactory _factory;
	private readonly HttpClient _client;
	private const string RequestUri = "board/";
	
	public BoardControllerTest()
	{
		_factory = new CustomWebApplicationFactory();
		_client = _factory.CreateClient();
	}
	
	[Fact]
	public async Task AddBoard_AddBoardToDb_ReturnsSuccessfulProcess()
	{
		// arrange
		var dto = new BoardDTO
		{
			Name = "Test Board",
		};

		// act
		var content = new StringContent(JsonSerializer.Serialize(dto), Encoding.UTF8, "application/json");
		var httpResponse = await _client.PostAsync(RequestUri, content);

		// assert
		httpResponse.EnsureSuccessStatusCode();
		var addedBoard = await TestHelper.GetAddedBoardFromDatabaseAsync(_factory);

		Assert.NotNull(addedBoard);
		Assert.Equal(dto.Name, addedBoard.Name);
	}
	
	[Fact]
	public async Task UpdateBoard_UpdateBoardFromDb_ReturnsSuccessfulProcess()
	{
		// arrange
		var dto = new BoardDTO
		{
			Id = 1,
			Name = "Updated Board",
		};

		// act
		var content = new StringContent(JsonSerializer.Serialize(dto), Encoding.UTF8, "application/json");
		var httpResponse = await _client.PutAsync(RequestUri, content);

		// assert
		httpResponse.EnsureSuccessStatusCode();
		var updatedBoard = await TestHelper.GetUpdatedBoardFromDatabaseAsync(_factory, dto.Id);

		Assert.NotNull(updatedBoard);
		Assert.Equal(dto.Name, updatedBoard.Name);
	}
	
	[Fact]
	public async Task DeleteBoardById_DeleteBoardFromDb_ReturnsSuccessfulProcess()
	{
		// arrange
		int boardId = 2;

		// act
		var httpResponse = await _client.DeleteAsync(RequestUri + boardId);

		// assert
		httpResponse.EnsureSuccessStatusCode();
		var check = await TestHelper.CheckIfBoardExists(_factory, boardId);

		Assert.False(check);
	}
	
	public void Dispose()
	{
		_client.Dispose();
		_factory.Dispose();
	}
}