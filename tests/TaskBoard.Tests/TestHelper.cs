using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TaskBoard.BLL.Mappings;
using TaskBoard.DAL.Entities;
using TaskBoard.DAL.Infrastructure;

namespace TaskBoard.Tests;

public static class TestHelper
{
	public static IMapper ConfigureMapper()
	{
		var mapperConfiguration = new MapperConfiguration(cfg =>
		{
			cfg.AddProfile<AppMappingProfile>();
		});
		
		return mapperConfiguration.CreateMapper();
	}
	
	public static async Task<Card?> GetAddedCardFromDatabaseAsync(CustomWebApplicationFactory factory)
	{
		using var scope = factory.Services.CreateScope();
		var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

		return await dbContext.Cards
			.OrderByDescending(c => c.Id)
			.FirstOrDefaultAsync();
	}
	
	public static async Task<Card?> GetUpdatedCardFromDatabaseAsync(CustomWebApplicationFactory factory, int cardId)
	{
		using var scope = factory.Services.CreateScope();
		var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

		return await dbContext.Cards
			.SingleOrDefaultAsync(c => c.Id == cardId);
	}
	
	public static async Task<bool> CheckIfCardExists(CustomWebApplicationFactory factory, int cardId)
	{
		using var scope = factory.Services.CreateScope();
		var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

		return await dbContext.Cards.AnyAsync(c => c.Id == cardId);
	}
	
	public static async Task<Board?> GetAddedBoardFromDatabaseAsync(CustomWebApplicationFactory factory)
	{
		using var scope = factory.Services.CreateScope();
		var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

		return await dbContext.Boards
			.OrderByDescending(c => c.Id)
			.FirstOrDefaultAsync();
	}
	
	public static async Task<Board?> GetUpdatedBoardFromDatabaseAsync(CustomWebApplicationFactory factory, int boardId)
	{
		using var scope = factory.Services.CreateScope();
		var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

		return await dbContext.Boards
			.SingleOrDefaultAsync(c => c.Id == boardId);
	}
	
	public static async Task<bool> CheckIfBoardExists(CustomWebApplicationFactory factory, int boardId)
	{
		using var scope = factory.Services.CreateScope();
		var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

		return await dbContext.Boards.AnyAsync(c => c.Id == boardId);
	}
}