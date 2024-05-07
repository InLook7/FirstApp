using TaskBoard.BLL.DTOs;
using TaskBoard.BLL.Interfaces;
using TaskBoard.DAL.Infrastructure;

namespace TaskBoard.PL;

public static class Seed
{
	public static async Task<WebApplication> SeedData(this WebApplication app)
	{
		using (var scope = app.Services.CreateScope())
		{
			var serviceProvider = scope.ServiceProvider;
			var context = serviceProvider.GetRequiredService<AppDbContext>();
			
			context.Database.EnsureCreated();
			var check = context.Priorities.Any();
			
			if (check == false)
			{
			 	await SeedPriorities(serviceProvider);
				await SeedStatuses(serviceProvider);
				await SeedCards(serviceProvider);
			}
		}
		
		return app;
	}
	
	private static async Task SeedPriorities(IServiceProvider serviceProvider)
	{
		var priorityService = serviceProvider.GetRequiredService<IPriorityService>();

		var priorityDTOs = new List<PriorityDTO>
		{
			new PriorityDTO { Name = "High" },
			new PriorityDTO { Name = "Medium" },
			new PriorityDTO { Name = "Low", }
		};
		
		foreach (var priorityDTO in priorityDTOs)
			await priorityService.AddAsync(priorityDTO);
	}

	private static async Task SeedStatuses(IServiceProvider serviceProvider)
	{
		var statusService = serviceProvider.GetRequiredService<IStatusService>();

		var statusDOTs = new List<StatusDTO>
		{
			new StatusDTO { Name = "To do" },
			new StatusDTO { Name = "Planned" },
			new StatusDTO { Name = "In Progress" },
			new StatusDTO { Name = "Closed" }
		};

		foreach (var statusDOT in statusDOTs)
			await statusService.AddAsync(statusDOT);
	}
	
	private static async Task SeedCards(IServiceProvider serviceProvider)
	{
		var cardService = serviceProvider.GetRequiredService<ICardService>();
		var activityService = serviceProvider.GetRequiredService<IActivityService>();

		var cardDTOs = new List<CardDTO>
		{
			new CardDTO { Name = "HelloWorldCard", StatusId = 4, DueDate = DateTime.Parse("2024-05-01").ToUniversalTime(), Description = "First task ever", PriorityId = 3 },
			new CardDTO { Name = "Something important", StatusId = 4, DueDate = DateTime.Parse("2024-05-02").ToUniversalTime(), Description = "Important things", PriorityId = 2 },
			new CardDTO { Name = "Unicorn Wrangling", StatusId = 3, DueDate = DateTime.Parse("2024-05-02").ToUniversalTime(), Description = "Capture escaped unicorns in the office", PriorityId = 3 },
			new CardDTO { Name = "Finding Nemo's Cousin", StatusId = 3, DueDate = DateTime.Parse("2024-05-03").ToUniversalTime(), Description = "Search for Nemo's lesser-known cousin in the fish tank", PriorityId = 2 },
			new CardDTO { Name = "Taming the Office Poltergeist", StatusId = 2, DueDate = DateTime.Parse("2024-05-03").ToUniversalTime(), Description = "Teach the mischievous office poltergeist some manners", PriorityId = 1 },
			new CardDTO { Name = "Operation: Stealth Snack", StatusId = 2, DueDate = DateTime.Parse("2024-05-03").ToUniversalTime(), Description = "Successfully execute a covert snack raid from the break room", PriorityId = 3 },
			new CardDTO { Name = "Convincing the Coffee Machine to Work Overtime", StatusId = 1, DueDate = DateTime.Parse("2024-05-03").ToUniversalTime(), Description = "Negotiate with the coffee machine for extended working hours", PriorityId = 2 },
			new CardDTO { Name = "Cat Herding Training", StatusId = 1, DueDate = DateTime.Parse("2024-05-04").ToUniversalTime(), Description = "Learn the art of herding cats for better project management", PriorityId = 3 },
			new CardDTO { Name = "Juggling Invisible Tasks", StatusId = 2, DueDate = DateTime.Parse("2024-05-04").ToUniversalTime(), Description = "Master the skill of juggling tasks that seem to disappear", PriorityId = 2 },
			new CardDTO { Name = "Epic Battle Against Procrastination", StatusId = 3, DueDate = DateTime.Parse("2024-05-05").ToUniversalTime(), Description = "Engage in an epic showdown against the mighty procrastination monster", PriorityId = 3 },
			new CardDTO { Name = "Deciphering Ancient Code (Written by Interns)", StatusId = 4, DueDate = DateTime.Parse("2024-05-05").ToUniversalTime(), Description = "Unlock the secrets of ancient code left behind by previous interns", PriorityId = 2 },
			new CardDTO { Name = "Ghost Hunting Expedition", StatusId = 3, DueDate = DateTime.Parse("2024-05-05").ToUniversalTime(), Description = "Embark on a ghost hunting adventure in the office basement", PriorityId = 3 }
		};

		foreach (var cardDTO in cardDTOs)
		{
			await cardService.AddAsync(cardDTO);
			var newCard = await cardService.GetLastAsync();
			await activityService.AddCreateLog(newCard);		
		}
	}
}