import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";

import { of } from "rxjs";
import { createBoard, createBoardFailure, createBoardSuccess, deleteBoard, deleteBoardFailure, deleteBoardSuccess, getBoards, getBoardsFailure, getBoardsSuccess, updateBoard, updateBoardFailure, updateBoardSuccess } from "../actions/board.actions";
import { BoardService } from "../../services/board.service";

@Injectable()
export class BoardEffects {
  getBoards$ = createEffect(() => 
    this.actions$.pipe(ofType(getBoards), mergeMap(() => {
      return this.boardService.getBoards().pipe(
        map((boards) => getBoardsSuccess({ boards })),
        catchError((error) => of(getBoardsFailure({error: error.message})))
      )
    }))
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(ofType(createBoard),mergeMap(({ board }) => {
        return this.boardService.addBoard(board).pipe(
          map((board) => createBoardSuccess({ board })),
          catchError((error) => of(createBoardFailure({ error: error.message })))
        )
    }))
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(ofType(updateBoard),mergeMap(({ board }) => {
        return this.boardService.updateBoard(board).pipe(
          map((board) => updateBoardSuccess({ board })),
          catchError((error) => of(updateBoardFailure({ error: error.message })))
        )
    }))
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(ofType(deleteBoard),mergeMap(({ boardId }) => {
        return this.boardService.deleteBoard(boardId).pipe(
          map(() => deleteBoardSuccess({ boardId })),
          catchError((error) => of(deleteBoardFailure({ error: error.message })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private boardService: BoardService) {}
}