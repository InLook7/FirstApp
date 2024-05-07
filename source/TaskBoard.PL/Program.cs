using Microsoft.EntityFrameworkCore;
using TaskBoard.BLL.Services;
using TaskBoard.BLL.Mappings;
using TaskBoard.BLL.Interfaces;
using TaskBoard.BLL.Validators;
using TaskBoard.DAL.Repositories;
using TaskBoard.DAL.Infrastructure;
using TaskBoard.DAL.Interfaces;
using TaskBoard.DAL.Interfaces.RepositoryInterfaces;
using TaskBoard.PL;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddScoped<ICardRepository, CardRepository>();
builder.Services.AddScoped<IStatusRepository, StatusRepository>();
builder.Services.AddScoped<IPriorityRepository, PriorityRepository>();

builder.Services.AddScoped<CardDTOValidator>();
builder.Services.AddScoped<StatusDTOValidator>();
builder.Services.AddScoped<PriorityDTOValidator>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped<ICardService, CardService>();
builder.Services.AddScoped<IStatusService, StatusService>();
builder.Services.AddScoped<IPriorityService, PriorityService>();
builder.Services.AddScoped<IAnalyticsService, AnalyticsService>();
builder.Services.AddScoped<IActivityService, ActivityService>();

builder.Services.AddAutoMapper(typeof(AppMappingProfile));

builder.Services.AddDbContext<AppDbContext>(options => 
{
	options.UseNpgsql(builder.Configuration.GetValue<string>("DockerConnectionString"));
});

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(builder => builder
	.AllowAnyOrigin()
	.AllowAnyHeader()
	.AllowAnyMethod()
);

app.MapControllers();

await app.SeedData();

app.Run();