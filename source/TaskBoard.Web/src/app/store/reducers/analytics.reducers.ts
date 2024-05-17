import { createReducer, on } from '@ngrx/store';
import { countCardsByStatuses, countCardsByStatusesFailure, countCardsByStatusesSuccess } from '../actions/analytics.actions';

export interface AnalyticsState {
  statusCounts: { [statusId: number]: number };
  isLoading: boolean;
  error: any;
}

export const initialState: AnalyticsState = {
  statusCounts: {},
  isLoading: false,
  error: null
};

export const analyticsReducer = createReducer(
  initialState,
  on(countCardsByStatuses, state => ({...state, isLoading: true})),
  on(countCardsByStatusesSuccess, (state, { statusCounts }) => ({
    ...state,
    statusCounts,
    isLoading: false
  })),
  on(countCardsByStatusesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
);