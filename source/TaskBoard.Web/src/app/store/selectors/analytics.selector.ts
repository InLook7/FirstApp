import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnalyticsState } from '../states/analytics.state';


export const selectAnalyticsState = createFeatureSelector<AnalyticsState>('analytics');

export const isLoadingSelector = createSelector(
    selectAnalyticsState,
    state => state.isLoading
  );

export const analyticsSelector = createSelector(
  selectAnalyticsState,
  state => state.statusCounts
);

export const errorSelector = createSelector(
  selectAnalyticsState,
  state => state.error
);