using FluentValidation;
using TaskBoard.BLL.DTOs;

namespace TaskBoard.BLL.Validators;

public class PriorityDTOValidator : AbstractValidator<PriorityDTO>
{
    public PriorityDTOValidator()
    {
        RuleFor(priority => priority.Name)
            .NotEmpty().WithMessage("Name is required.");
    }
}