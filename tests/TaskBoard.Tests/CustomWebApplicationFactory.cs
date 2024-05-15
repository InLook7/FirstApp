using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using TaskBoard.DAL.Infrastructure;

namespace TaskBoard.Tests;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
	protected override void ConfigureWebHost(IWebHostBuilder builder)
	{
		builder.ConfigureServices(services =>
		{
			var descriptor = services.SingleOrDefault(
				d => d.ServiceType ==
					typeof(DbContextOptions<AppDbContext>));

			if (descriptor != null)
			{
				services.Remove(descriptor);
			}

			services.AddDbContext<AppDbContext>(options =>
			{
				options.UseInMemoryDatabase("InMemoryDbForTesting");
			});
		});
	}
}