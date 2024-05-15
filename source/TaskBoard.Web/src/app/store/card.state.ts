import { Card } from "../models/card";

export interface CardState {
  cards: Card[];
  loading: boolean;
  error: string | null;
}