import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";

import { changeStatusCard, changeStatusCardFailure, changeStatusCardSuccess, createCard, createCardFailure, createCardSuccess, deleteCard, deleteCardFailure, deleteCardSuccess, getCards, getCardsFailure, getCardsSuccess, updateCard, updateCardFailure, updateCardSuccess } from "../actions/card.actions";
import { CardService } from "../../services/card.service";
import { of } from "rxjs";

@Injectable()
export class CardEffects {
  getCards$ = createEffect(() => 
    this.actions$.pipe(ofType(getCards), mergeMap(() => {
      return this.cardService.getCards().pipe(
        map((cards) => getCardsSuccess({ cards })),
        catchError((error) => of(getCardsFailure({error: error.message})))
      )
    }))
  );

  createCard$ = createEffect(() =>
    this.actions$.pipe(ofType(createCard),mergeMap(({ card }) => {
        return this.cardService.addCard(card).pipe(
          map((card) => createCardSuccess({ card })),
          catchError((error) => of(createCardFailure({ error: error.message })))
        )
    }))
  );

  updateCard$ = createEffect(() =>
    this.actions$.pipe(ofType(updateCard),mergeMap(({ card }) => {
        return this.cardService.updateCard(card).pipe(
          map((card) => updateCardSuccess({ card })),
          catchError((error) => of(updateCardFailure({ error: error.message })))
        )
    }))
  );

  deleteCard$ = createEffect(() =>
    this.actions$.pipe(ofType(deleteCard),mergeMap(({ cardId }) => {
        return this.cardService.deleteCard(cardId).pipe(
          map(() => deleteCardSuccess({ cardId })),
          catchError((error) => of(deleteCardFailure({ error: error.message })))
        );
      })
    )
  );

  changeStatusCard$ = createEffect(() => 
    this.actions$.pipe(ofType(changeStatusCard), mergeMap(({ cardId, statusId }) => {
      return this.cardService.changeStatusCard(cardId, statusId).pipe(
        map(() => changeStatusCardSuccess({ cardId, statusId })),
        catchError((error) => of(changeStatusCardFailure({error: error.message})))
      )
    }))
  );

  constructor(private actions$: Actions, private cardService: CardService) {}
}