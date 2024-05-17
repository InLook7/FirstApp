import { createReducer, on } from "@ngrx/store";

import { StatusState } from "../states/status.state";
import { createStatusSuccess, deleteStatusSuccess, getStatusByBIdSuccess, getStatusesByBoardId, getStatusesByBoardIdFailure, getStatusesByBoardIdSuccess, updateStatusSuccess } from "../actions/status.actions";

export const initialState: StatusState = {
  statuses: [],
  isLoading: false,
  error: null
};

export const statusReducer = createReducer(
  initialState,
  on(getStatusesByBoardId, (state) => ({ ...state, isLoading: true })),
  on(getStatusesByBoardIdSuccess, (state, action)  => ({
    ...state,
    isLoading: false,
    statuses: action.statuses,
  })),
  on(getStatusesByBoardIdFailure, (state, action)  => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(getStatusByBIdSuccess, (state, action)  => ({
    ...state,
    isLoading: false,
    status: action.status,
  })),
  on(createStatusSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    statuses: [...state.statuses, action.status]
  })),
  on(updateStatusSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    statuses: state.statuses.map(status => status.id === action.status.id ? action.status : status)
  })),
  on(deleteStatusSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    statuses: state.statuses.filter(status => status.id !== action.statusId)
  }))
);