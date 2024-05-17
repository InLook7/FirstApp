import { createReducer, on } from "@ngrx/store";

import { changeStatusCardSuccess, createCardSuccess, deleteCardSuccess, getCards, getCardsFailure, getCardsSuccess, updateCardSuccess } from '../actions/card.actions';
import { CardState } from "../states/card.state";

export const initialState: CardState = {
  cards: [],
  isLoading: false,
  error: null
};

export const cardReducer = createReducer(
  initialState,
  on(getCards, (state) => ({ ...state, isLoading: true })),
  on(getCardsSuccess, (state, action)  => ({
    ...state,
    isLoading: false,
    cards: action.cards,
  })),
  on(getCardsFailure, (state, action)  => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(createCardSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    cards: [...state.cards, action.card]
  })),
  on(updateCardSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    cards: state.cards.map(card => card.id === action.card.id ? action.card : card)
  })),
  on(deleteCardSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    cards: state.cards.filter(card => card.id !== action.cardId)
  })),
  on(changeStatusCardSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    cards: state.cards.map(card => card.id === action.cardId ? { ...card, statusId: action.statusId } : card)
  }))
);