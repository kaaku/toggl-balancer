import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const TimeEntryContext = React.createContext({
  timeEntriesByDate: {},
  workdayOverrides: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleWorkday: () => {},
});
