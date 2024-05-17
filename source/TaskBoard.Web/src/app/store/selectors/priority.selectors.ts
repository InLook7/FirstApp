import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../appState.interface';

export const selectFeature = (state: AppStateInterface) => state.priorities;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const prioritiesSelector = createSelector(
  selectFeature,
  (state) => state.priorities
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);