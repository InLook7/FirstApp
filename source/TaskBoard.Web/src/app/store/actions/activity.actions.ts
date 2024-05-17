import { createAction, props } from "@ngrx/store";

import { Activity } from "../../models/activity";

export const getActivitiesByBoardId = createAction('[Activities] Get Activities By Board Id',
  props<{ boardId: number, count: number }>()
) 

export const getActivitiesByBoardIdSuccess = createAction('[Activities] Get Activities By Board Id Activities success', 
  props<{ activities: Activity[] }>()
);

export const getActivitiesByBoardIdFailure = createAction('[Activities] Get Activities By Board Id failure', 
  props<{ error: string }>()
);

export const getActivitiesByCardId = createAction('[Activities] Get Activities By Card Id Activities', 
  props<{ cardId: number, count: number }>()
) 

export const getActivitiesByCardIdSuccess = createAction('[Activities] Get Activities By Card Id success', 
  props<{ activities: Activity[] }>()
);

export const getActivitiesByCardIdFailure = createAction('[Activities] Get Activities By Card Id failure', 
  props<{ error: string }>()
);

export const resetActivities = createAction('[Activities] Reset Activities');