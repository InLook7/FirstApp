import { createAction, props } from '@ngrx/store';

export const countCardsByStatuses = createAction('[Analytics] Count Cards By Statuses');

export const countCardsByStatusesSuccess = createAction('[Analytics] Count Cards By Statuses Success',
  props<{ statusCounts: { [statusId: number]: number } }>()
);

export const countCardsByStatusesFailure = createAction('[Analytics] Count Cards By Statuses Failure',
  props<{ error: any }>()
);