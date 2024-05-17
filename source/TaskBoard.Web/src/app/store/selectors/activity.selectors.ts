import { createSelector } from '@ngrx/store';

import { AppStateInterface } from '../appState.interface';

export const selectFeature = (state: AppStateInterface) => state.activities;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const activitiesSelector = createSelector(
  selectFeature,
  (state) => state.activities
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);