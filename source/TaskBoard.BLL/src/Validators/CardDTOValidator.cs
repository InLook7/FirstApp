using FluentValidation;
using TaskBoard.BLL.DTOs;

namespace TaskBoard.BLL.Validators;

public class CardDTOValidator : AbstractValidator<CardDTO>
{
	public CardDTOValidator()
	{
		RuleFor(card => card.Name)
			.NotEmpty().WithMessage("Name is required.");
		
		RuleFor(card => card.DueDate)
            .Must(BeAValidDate).WithMessage("DueDate must be a valid date.");
	}
	
	private bool BeAValidDate(DateTime date)
	{
		return !date.Equals(default(DateTime));
	}
}