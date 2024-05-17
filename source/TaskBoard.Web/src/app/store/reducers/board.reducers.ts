import { createReducer, on } from "@ngrx/store";

import { BoardState } from "../states/board.state";
import { createBoardSuccess, deleteBoardSuccess, getBoards, getBoardsFailure, getBoardsSuccess, updateBoardSuccess } from "../actions/board.actions";

export const initialState: BoardState = {
  boards: [],
  isLoading: false,
  error: null
};

export const boardReducer = createReducer(
  initialState,
  on(getBoards, (state) => ({ ...state, isLoading: true })),
  on(getBoardsSuccess, (state, action)  => ({
    ...state,
    isLoading: false,
    boards: action.boards,
  })),
  on(getBoardsFailure, (state, action)  => ({
    ...state,
    isLoading: false,
    error: action.error
  })),
  on(createBoardSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    boards: [...state.boards, action.board]
  })),
  on(updateBoardSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    boards: state.boards.map(board => board.id === action.board.id ? action.board : board)
  })),
  on(deleteBoardSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    boards: state.boards.filter(board => board.id !== action.boardId)
  }))
);