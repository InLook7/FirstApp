import { createAction, props } from "@ngrx/store";

import { Priority } from "../../models/priority";

export const getPriorities = createAction('[Priorities] Get Priorities') 

export const getPrioritiesSuccess = createAction('[Priorities] Get Priorities success', 
  props<{ priorities: Priority[] }>()
);

export const getPrioritiesFailure = createAction('[Priorities] Get Priorities failure', 
  props<{ error: string }>()
);