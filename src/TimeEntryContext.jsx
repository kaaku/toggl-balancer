import React from 'react';

export const TimeEntryContext = React.createContext({
  timeEntriesByDate: {},
  workdayOverrides: {},
  toggleWorkday: () => {}
});
