import { Priority } from "../../models/priority";

export interface PriorityState {
  priorities: Priority[];
  isLoading: boolean;
  error: string | null;
}