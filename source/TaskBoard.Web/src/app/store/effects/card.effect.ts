import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { getCards, getCardsSuccess } from "../actions/card.action";
import { map, mergeMap } from "rxjs/operators";
import { CardService } from "../../services/card.service";

@Injectable()
export class CardEffects {
  getCards$ = createEffect(() => 
    this.actions$.pipe(
      ofType(getCards),
      mergeMap(() => {
        return this.cardService
          .getCards()
          .pipe(map((cards) => getCardsSuccess({ cards })));
      })
    )
  );

  constructor(private actions$: Actions, private cardService: CardService) {}
}