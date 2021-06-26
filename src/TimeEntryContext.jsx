import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const TimeEntryContext = React.createContext({
  timeEntriesByDate: {},
  workdayOverrides: {},
  toggleWorkday: () => {},
});
