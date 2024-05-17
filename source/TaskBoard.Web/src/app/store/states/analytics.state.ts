export interface AnalyticsState {
  statusCounts: { [statusId: number]: number };
  isLoading: boolean;
  error: any;
}