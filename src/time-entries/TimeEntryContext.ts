import React from 'react';
import { AggregateTimeEntries } from './TimeEntryStore';

interface TimeEntryContext {
  timeEntriesByDate: { [date: string]: AggregateTimeEntries };
  workdayOverrides: { [date: string]: boolean };
  toggleWorkday: (date: string) => void;
}

export default React.createContext<TimeEntryContext>({
  timeEntriesByDate: {},
  workdayOverrides: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleWorkday: () => {},
});
