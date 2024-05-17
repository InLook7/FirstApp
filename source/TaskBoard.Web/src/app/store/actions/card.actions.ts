import { createAction, props } from "@ngrx/store";

import { Card } from "../../models/card";

export const getCards = createAction('[Cards] Get Cards') 

export const getCardsSuccess = createAction('[Cards] Get Cards success', 
  props<{ cards: Card[] }>()
);

export const getCardsFailure = createAction('[Cards] Get Cards failure', 
  props<{ error: string }>()
);

export const createCard = createAction('[Cards] Create Card', 
  props<{ card: Card }>()
);

export const createCardSuccess = createAction('[Cards] Create Card success', 
  props<{ card: Card }>()
);

export const createCardFailure = createAction('[Cards] Create Card failure', 
  props<{ error: string }>()
);  

export const updateCard = createAction('[Cards] Update Card', 
  props<{ card: Card }>()
);

export const updateCardSuccess = createAction('[Cards] Update Card success', 
  props<{ card: Card }>()
);

export const updateCardFailure = createAction('[Cards] Update Card failure', 
  props<{ error: string }>()
);

export const deleteCard = createAction('[Cards] Delete Card',
  props<{ cardId: number }>()
);

export const deleteCardSuccess = createAction('[Cards] Delete Card success',
  props<{ cardId: number }>()
);

export const deleteCardFailure = createAction('[Cards] Delete Card failure',
  props<{ error: string }>()
);

export const changeStatusCard = createAction('[Cards] Change Status Card',
  props<{ cardId: number, statusId: number }>()
);

export const changeStatusCardSuccess = createAction('[Cards] Change Status Card success',
  props<{ cardId: number, statusId: number }>()
);

export const changeStatusCardFailure = createAction('[Cards] Change Status Card failure',
  props<{ error: string }>()
);