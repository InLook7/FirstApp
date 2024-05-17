import { createAction, props } from "@ngrx/store";

import { Board } from "../../models/board";

export const getBoards = createAction('[Boards] Get Boards') 

export const getBoardsSuccess = createAction('[Boards] Get Boards success', 
  props<{ boards: Board[] }>()
);

export const getBoardsFailure = createAction('[Boards] Get Boards failure', 
  props<{ error: string }>()
);

export const createBoard= createAction('[Boards] Create Board', 
  props<{ board: Board }>()
);

export const createBoardSuccess = createAction('[Boards] Create Board success', 
  props<{ board: Board }>()
);

export const createBoardFailure = createAction('[Boards] Create Board failure', 
  props<{ error: string }>()
);  

export const updateBoard = createAction('[Boards] Update Board', 
  props<{ board: Board }>()
);

export const updateBoardSuccess = createAction('[Boards] Update Board success', 
  props<{ board: Board }>()
);

export const updateBoardFailure = createAction('[Boards] Update Board failure', 
  props<{ error: string }>()
);

export const deleteBoard = createAction('[Boards] Delete Board',
  props<{ boardId: number }>()
);

export const deleteBoardSuccess = createAction('[Boards] Delete Board success',
  props<{ boardId: number }>()
);

export const deleteBoardFailure = createAction('[Boards] Delete Board failure',
  props<{ error: string }>()
);