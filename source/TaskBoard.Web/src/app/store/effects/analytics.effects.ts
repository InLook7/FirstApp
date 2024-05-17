import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AnalyticsService } from '../../services/analytics.service';
import { countCardsByStatuses, countCardsByStatusesFailure, countCardsByStatusesSuccess } from '../actions/analytics.actions';


@Injectable()
export class AnalyticsEffects {
  loadCountCardsByStatuses$ = createEffect(() =>
    this.actions$.pipe(ofType(countCardsByStatuses),
      switchMap(() =>
        this.analyticsService.getCountCardsByStatuses().pipe(
          map(statusCounts => countCardsByStatusesSuccess({ statusCounts })),
          catchError(error => of(countCardsByStatusesFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private analyticsService: AnalyticsService) {}
}