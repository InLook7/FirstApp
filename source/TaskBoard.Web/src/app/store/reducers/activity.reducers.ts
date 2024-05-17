import { createReducer, on } from "@ngrx/store";

import { ActivityState } from "../states/activity.state";
import { getActivitiesByBoardId, getActivitiesByBoardIdFailure, getActivitiesByBoardIdSuccess, getActivitiesByCardId, getActivitiesByCardIdFailure, getActivitiesByCardIdSuccess, resetActivities } from "../actions/activity.actions";

export const initialState: ActivityState = {
  activities: [],
  isLoading: false,
  error: null
};

export const activityReducer = createReducer(
  initialState,
  on(getActivitiesByBoardId, (state) => ({ ...state, isLoading: true })),
  on(getActivitiesByBoardIdSuccess, (state, action)  => ({
    ...state,
    isLoading: false,
    activities: [...state.activities, ...action.activities]
  })),
  on(getActivitiesByBoardIdFailure, (state, action)  => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(getActivitiesByCardId, (state) => ({ ...state, isLoading: true })),
  on(getActivitiesByCardIdSuccess, (state, action)  => ({
    ...state,
    isLoading: false,
    activities: [...state.activities, ...action.activities]
  })),
  on(getActivitiesByCardIdFailure, (state, action)  => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(resetActivities, (state) => ({
    ...state,
    activities: []
  })),
);