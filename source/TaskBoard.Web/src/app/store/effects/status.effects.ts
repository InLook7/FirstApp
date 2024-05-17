import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { createStatus, createStatusFailure, createStatusSuccess, deleteStatus, deleteStatusFailure, deleteStatusSuccess, getStatusByBId, getStatusByBIdIdFailure, getStatusByBIdSuccess, getStatusesByBoardId, getStatusesByBoardIdFailure, getStatusesByBoardIdSuccess, updateStatus, updateStatusFailure, updateStatusSuccess } from "../actions/status.actions";
import { StatusService } from "../../services/status.service";

@Injectable()
export class StatusEffects {
  getStatusesByBoardId$ = createEffect(() => 
    this.actions$.pipe(ofType(getStatusesByBoardId), mergeMap(({ boardId }) => {
      return this.statusService.getStatusesByBoardId(boardId).pipe(
        map((statuses) => getStatusesByBoardIdSuccess({ statuses })),
        catchError((error) => of(getStatusesByBoardIdFailure({error: error.message})))
      )
    }))
  );

  getStatusById$ = createEffect(() => 
    this.actions$.pipe(ofType(getStatusByBId), mergeMap(({ statusId }) => {
      return this.statusService.getStatusById(statusId).pipe(
        map((status) => getStatusByBIdSuccess({ status })),
        catchError((error) => of(getStatusByBIdIdFailure({error: error.message})))
      )
    }))
  );

  createStatus$ = createEffect(() =>
    this.actions$.pipe(ofType(createStatus),mergeMap(({ status }) => {
        return this.statusService.addStatus(status).pipe(
          map((status) => createStatusSuccess({ status })),
          catchError((error) => of(createStatusFailure({ error: error.message })))
        )
    }))
  );

  updateStatus$ = createEffect(() =>
    this.actions$.pipe(ofType(updateStatus),mergeMap(({ status }) => {
        return this.statusService.updateStatus(status).pipe(
          map((status) => updateStatusSuccess({ status })),
          catchError((error) => of(updateStatusFailure({ error: error.message })))
        )
    }))
  );

  deleteStatus$ = createEffect(() =>
    this.actions$.pipe(ofType(deleteStatus),mergeMap(({ statusId }) => {
        return this.statusService.deleteStatus(statusId).pipe(
          map(() => deleteStatusSuccess({ statusId })),
          catchError((error) => of(deleteStatusFailure({ error: error.message })))
        );
      })
    )
  );

  constructor(private actions$: Actions, private statusService: StatusService) {}
}