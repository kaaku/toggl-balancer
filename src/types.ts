import { Moment } from 'moment/moment';

export interface AggregateTimeEntries {
  timeEntries: TimeEntry[];
  duration: number | null;
  hasRunningEntry: boolean;
}

export interface DateRange {
  startDate: Moment | null;
  endDate: Moment | null;
}

export interface TimeEntry {
  start: Moment;
  end: Moment;
  duration: number;
  isRunning: boolean;
}
