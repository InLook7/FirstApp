import { ActivityState } from "./states/activity.state";
import { AnalyticsState } from "./states/analytics.state";
import { BoardState } from "./states/board.state";
import { CardState } from "./states/card.state";
import { PriorityState } from "./states/priority.state";
import { StatusState } from "./states/status.state";

export interface AppStateInterface {
    cards: CardState;
    statuses: StatusState;
    boards: BoardState;
    priorities: PriorityState;
    activities: ActivityState;
    analytics: AnalyticsState;
}