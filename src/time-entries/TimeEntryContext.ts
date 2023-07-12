import React from 'react';

import { AggregateTimeEntries } from '../types';

export interface TimeEntryContextType {
  timeEntriesByDate: { [date: string]: AggregateTimeEntries };
  workdayOverrides: { [date: string]: boolean };
  toggleWorkday: (date: string) => void;
}

export const TimeEntryContext = React.createContext<TimeEntryContextType>({
  timeEntriesByDate: {},
  workdayOverrides: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleWorkday: () => {},
});
