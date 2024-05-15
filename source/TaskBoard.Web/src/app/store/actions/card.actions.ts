import { createAction, props } from "@ngrx/store";

import { Card } from "../../models/card";

export const getCards = createAction('[Cards] Get Cards') 

export const getCardsSuccess = createAction('[Cards] Get Cards success', 
  props<{ cards: Card[] }>()
);