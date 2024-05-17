import { createAction, props } from "@ngrx/store";

import { Status } from "../../models/status";

export const getStatusesByBoardId = createAction('[Statuses] Get Statuses By Board Id', 
  props<{ boardId: number }>()
) 

export const getStatusesByBoardIdSuccess = createAction('[Statuses] Get Statuses By Board Id success', 
  props<{ statuses: Status[] }>()
);

export const getStatusesByBoardIdFailure = createAction('[Statuses] Get Statuses By Board Id failure', 
  props<{ error: string }>()
);

export const getStatusByBId = createAction('[Statuses] Get Status By Id', 
  props<{ statusId: number }>()
) 

export const getStatusByBIdSuccess = createAction('[Statuses] Get Status By Id success', 
  props<{ status: Status }>()
);

export const getStatusByBIdIdFailure = createAction('[Statuses] Get Status By Id failure', 
  props<{ error: string }>()
);

export const createStatus = createAction('[Statuses] Create Status', 
  props<{ status: Status }>()
);

export const createStatusSuccess = createAction('[Statuses] Create Status success', 
  props<{ status: Status }>()
);

export const createStatusFailure = createAction('[Statuses] Create Status failure', 
  props<{ error: string }>()
);  

export const updateStatus = createAction('[Statuses] Update Status', 
  props<{ status: Status }>()
);

export const updateStatusSuccess = createAction('[Statuses] Update Status success', 
  props<{ status: Status }>()
);

export const updateStatusFailure = createAction('[Statuses] Update Status failure', 
  props<{ error: string }>()
);

export const deleteStatus = createAction('[Statuses] Delete Status',
  props<{ statusId: number }>()
);

export const deleteStatusSuccess = createAction('[Statuses] Delete Status success',
  props<{ statusId: number }>()
);

export const deleteStatusFailure = createAction('[Statuses] Delete Status failure',
  props<{ error: string }>()
);