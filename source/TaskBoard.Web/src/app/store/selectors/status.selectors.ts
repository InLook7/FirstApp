import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../appState.interface';

export const selectFeature = (state: AppStateInterface) => state.statuses;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const statusesSelector = createSelector(
  selectFeature,
  (state) => state.statuses
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);