import { createReducer, on } from "@ngrx/store";

import { PriorityState } from "../states/priority.state";
import { getPriorities, getPrioritiesFailure, getPrioritiesSuccess } from "../actions/priority.actions";

export const initialState: PriorityState = {
  priorities: [],
  isLoading: false,
  error: null
};

export const priorityReducer = createReducer(
  initialState,
  on(getPriorities, (state) => ({ ...state, isLoading: true })),
  on(getPrioritiesSuccess, (state, action)  => ({
    ...state,
    isLoading: false,
    priorities: action.priorities,
  })),
  on(getPrioritiesFailure, (state, action)  => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
);