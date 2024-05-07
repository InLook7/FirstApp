using TaskBoard.BLL.DTOs;

namespace TaskBoard.BLL.Interfaces;

public interface IAnalyticsService
{
    Task<IEnumerable<CountCardsDTO>> CountCardsByStatuses();
}