import { createReducer, on } from "@ngrx/store";

import { getCards, getCardsSuccess } from '../actions/card.action';
import { CardState } from "../card.state";

export const initialState: CardState = {
  cards: [],
  loading: false,
  error: null
};

export const cardReducer = createReducer(
  initialState,
  on(getCards, (state) => ({ ...state, isLoading: true })),
  on(getCardsSuccess, (state, action)  => ({
    ...state,
    isLoading: false,
    cards: action.cards,
  }))
);