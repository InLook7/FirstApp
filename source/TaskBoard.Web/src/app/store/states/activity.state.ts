import { Activity } from "../../models/activity";

export interface ActivityState {
  activities: Activity[];
  isLoading: boolean;
  error: string | null;
}