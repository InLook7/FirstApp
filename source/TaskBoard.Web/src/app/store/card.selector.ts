import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CardState } from './card.state';

export const selectCardState = createFeatureSelector<CardState>('cards');

export const selectCards = createSelector(
  selectCardState,
  (state: CardState) => state.cards
);