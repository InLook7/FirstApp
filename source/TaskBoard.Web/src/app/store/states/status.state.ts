import { Status } from "../../models/status";

export interface StatusState {
  statuses: Status[];
  isLoading: boolean;
  error: string | null;
}