using AutoMapper;
using TaskBoard.BLL.DTOs;
using TaskBoard.DAL.Entities;

namespace TaskBoard.BLL.Mappings;

public class AppMappingProfile : Profile
{
	public AppMappingProfile()
	{
		CreateMap<Card, CardDTO>()
			.ForMember(dto => dto.PriorityName, c => c.MapFrom(x => x.Priority.Name))
			.ForMember(dto => dto.BoardId, c => c.MapFrom(x => x.Status.Board.Id));
			
		CreateMap<CardDTO, Card>();
		
		CreateMap<Status, StatusDTO>()
			.ReverseMap();
			
		CreateMap<Priority, PriorityDTO>()
			.ReverseMap();
		
		CreateMap<Board, BoardDTO>()
			.ReverseMap();

		CreateMap<Activity, ActivityDTO>();
	}
}