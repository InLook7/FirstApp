import { Board } from "../../models/board";

export interface BoardState {
  boards: Board[];
  isLoading: boolean;
  error: string | null;
}