using FluentValidation;
using TaskBoard.BLL.DTOs;

namespace TaskBoard.BLL.Validators;

public class StatusDTOValidator : AbstractValidator<StatusDTO>
{
    public StatusDTOValidator()
    {
        RuleFor(status => status.Name)
            .NotEmpty().WithMessage("Name is required.");
    }
}