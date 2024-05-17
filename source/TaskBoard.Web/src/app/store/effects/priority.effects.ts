import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";

import { of } from "rxjs";
import { PriorityService } from "../../services/priority.service";
import { getPriorities, getPrioritiesFailure, getPrioritiesSuccess } from "../actions/priority.actions";

@Injectable()
export class PriorityEffects {
  getPriorities$ = createEffect(() => 
    this.actions$.pipe(ofType(getPriorities), mergeMap(() => {
      return this.priortyService.getPriorities().pipe(
        map((priorities) => getPrioritiesSuccess({ priorities })),
        catchError((error) => of(getPrioritiesFailure({error: error.message})))
      )
    }))
  );

  constructor(private actions$: Actions, private priortyService: PriorityService) {}
}