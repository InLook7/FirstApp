import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../appState.interface';

export const selectFeature = (state: AppStateInterface) => state.cards;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const cardsSelector = createSelector(
  selectFeature,
  (state) => state.cards
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);