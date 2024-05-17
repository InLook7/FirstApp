import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../appState.interface';

export const selectFeature = (state: AppStateInterface) => state.boards;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const boardsSelector = createSelector(
  selectFeature,
  (state) => state.boards
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);