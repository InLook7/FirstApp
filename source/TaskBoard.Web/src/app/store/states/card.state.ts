import { Card } from "../../models/card";

export interface CardState {
  cards: Card[];
  isLoading: boolean;
  error: string | null;
}