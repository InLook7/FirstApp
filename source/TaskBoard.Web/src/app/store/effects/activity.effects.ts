import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { ActivityService } from "../../services/activity.service";
import { getActivitiesByBoardId, getActivitiesByBoardIdFailure, getActivitiesByBoardIdSuccess, getActivitiesByCardId, getActivitiesByCardIdFailure, getActivitiesByCardIdSuccess } from "../actions/activity.actions";

@Injectable()
export class ActivityEffects {
  getActivitiesByBoardId$ = createEffect(() => 
    this.actions$.pipe(ofType(getActivitiesByBoardId), mergeMap(({ boardId, count }) => {
      return this.activityService.getLastLogsByBoardId(boardId, count).pipe(
        map((activities) => getActivitiesByBoardIdSuccess({ activities })),
        catchError((error) => of(getActivitiesByBoardIdFailure({error: error.message})))
      )
    }))
  );

  getActivitiesByCardId$ = createEffect(() => 
    this.actions$.pipe(ofType(getActivitiesByCardId), mergeMap(({ cardId, count }) => {
      return this.activityService.getLastLogsByCardId(cardId, count).pipe(
        map((activities) => getActivitiesByCardIdSuccess({ activities })),
        catchError((error) => of(getActivitiesByCardIdFailure({error: error.message})))
      )
    }))
  );

  constructor(private actions$: Actions, private activityService: ActivityService) {}
}