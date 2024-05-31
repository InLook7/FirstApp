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

export const boardSelector = (boardId: number) => createSelector(
  boardsSelector, (boards) => boards.find(board => board.id === boardId)
);

export const firstBoardSelector = createSelector(
  boardsSelector, (boards) => boards[0]
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);