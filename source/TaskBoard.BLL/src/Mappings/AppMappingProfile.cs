using AutoMapper;
using TaskBoard.BLL.DTOs;
using TaskBoard.DAL.Entities;

namespace TaskBoard.BLL.Mappings;

public class AppMappingProfile : Profile
{
	public AppMappingProfile()
	{
		CreateMap<Card, CardDTO>()
			.ForMember(dto => dto.PriorityName, c => c.MapFrom(x => x.Priority.Name));
			
		CreateMap<CardDTO, Card>();
		
		CreateMap<Status, StatusDTO>()
			.ReverseMap();
			
		CreateMap<Priority, PriorityDTO>()
			.ReverseMap();
		
		CreateMap<Activity, ActivityDTO>();
	}
}