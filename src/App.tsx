import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import moment, { ISO_8601 } from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';

import ApiTokenDialog from './ApiTokenDialog';
import CalendarGridContainer from './CalendarGridContainer';
import DateRangeSelector from './DateRangeSelector';
import { timeEntryStore } from './time-entries/TimeEntryStore';
import Duration from './Duration';
import RunningEntryIndicator from './RunningEntryIndicator';
import { TimeEntryContext, TimeEntryContextType } from './time-entries/TimeEntryContext';
import './styles.css';
import { AggregateTimeEntries, DateRange } from './types';

const defaultDateRange: DateRange = {
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month').startOf('day'),
};

function parseMoment(input: string | null) {
  if (!input) return null;
  const parsed = moment(input, ISO_8601);
  return parsed.isValid() ? parsed : null;
}

function readCachedApiToken() {
  return localStorage.getItem('apiToken');
}

function readCachedDateRange(): DateRange | null {
  const startDate = parseMoment(localStorage.getItem('startDate'));
  const endDate = parseMoment(localStorage.getItem('endDate'));
  return startDate && endDate ? { startDate, endDate } : null;
}

function readCachedWorkdayOverrides(): { [date: string]: boolean } | null {
  try {
    const workdayOverridesString = localStorage.getItem('workdayOverrides');
    return workdayOverridesString ? JSON.parse(workdayOverridesString) : null;
  } catch (e) {
    return null;
  }
}

function writeStateToLocalStorage(
  apiToken: string | null,
  dateRange: DateRange,
  workdayOverrides: { [date: string]: boolean }
) {
  if (apiToken) {
    localStorage.setItem('apiToken', apiToken);
  } else {
    localStorage.removeItem('apiToken');
  }
  Object.entries(dateRange).forEach(([key, value]) => {
    if (value) {
      localStorage.setItem(key, value?.format('YYYY-MM-DD') ?? '');
    } else {
      localStorage.removeItem(key);
    }
  });
  if (workdayOverrides && Object.keys(workdayOverrides).length > 0) {
    localStorage.setItem('workdayOverrides', JSON.stringify(workdayOverrides));
  } else {
    localStorage.removeItem('workdayOverrides');
  }
}

export default function App() {
  const [apiToken, setApiToken] = useState(readCachedApiToken());
  const [apiTokenDialogOpen, setApiTokenDialogOpen] = useState(!apiToken);
  const [dateRange, setDateRange] = useState(readCachedDateRange() ?? defaultDateRange);
  const [timeEntriesByDate, setTimeEntriesByDate] = useState<{ [date: string]: AggregateTimeEntries }>({});
  const [workdayOverrides, setWorkdayOverrides] = useState(readCachedWorkdayOverrides() ?? {});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (apiToken && dateRange) {
      timeEntryStore
        .fetchTimeEntries(dateRange, apiToken, workdayOverrides)
        .then((result) => {
          setTimeEntriesByDate(result);
          setError(null);
        })
        .catch((e) => {
          setTimeEntriesByDate({});
          setError(e.message);
        });
    }
  }, [apiToken, dateRange, workdayOverrides]);

  useEffect(
    () => writeStateToLocalStorage(apiToken, dateRange, workdayOverrides),
    [apiToken, dateRange, workdayOverrides]
  );

  const handleDialogClose = (newApiToken: string) => {
    setApiTokenDialogOpen(false);
    setApiToken(newApiToken ?? null);
  };

  const handleLogout = () => {
    setApiToken(null);
    setApiTokenDialogOpen(true);
    setDateRange(defaultDateRange);
    setTimeEntriesByDate({});
    setWorkdayOverrides({});
  };

  const toggleWorkday = (date: string) => {
    const oldSetting = timeEntryStore.isWorkday(date, workdayOverrides, timeEntriesByDate[date].timeEntries.length > 0);
    const newWorkdayOverrides = { ...workdayOverrides, [date]: !oldSetting };
    const refreshedTimeEntries = timeEntryStore.refreshDurations(timeEntriesByDate, newWorkdayOverrides);

    setTimeEntriesByDate(refreshedTimeEntries);
    setWorkdayOverrides(newWorkdayOverrides);
  };

  const timeEntryContext: TimeEntryContextType = useMemo(
    () => ({
      timeEntriesByDate,
      workdayOverrides,
      toggleWorkday,
    }),
    [timeEntriesByDate, workdayOverrides]
  );

  if (!apiToken) {
    return <ApiTokenDialog open mandatory onClose={handleDialogClose} />;
  }

  const totalTimeDiff = Object.values(timeEntriesByDate).reduce((sum, entry) => sum + (entry.duration ?? 0), 0);
  const isTrackingOngoing = Object.values(timeEntriesByDate).some((entry) => entry.hasRunningEntry);

  return (
    <Box sx={{ padding: 4 }}>
      <ApiTokenDialog
        open={apiTokenDialogOpen}
        mandatory={false}
        oldApiToken={apiToken}
        onClose={handleDialogClose}
        onDismiss={() => setApiTokenDialogOpen(false)}
      />
      <Button
        sx={{ position: 'absolute', top: (theme) => theme.spacing(2), right: (theme) => theme.spacing(2) }}
        onClick={handleLogout}
      >
        Log out
      </Button>
      <Grid container justifyContent="center" sx={{ mt: 5, mb: 10 }}>
        <Grid>
          <DateRangeSelector dateRange={dateRange} onChange={(newDateRange) => setDateRange(newDateRange)} />
        </Grid>
        {!dateRange?.startDate?.isSame(dateRange?.endDate, 'month') && (
          <Grid xs={12}>
            <Typography variant="h2" align="center" sx={{ mt: 3 }}>
              Total: <Duration duration={totalTimeDiff} useColors />
              <RunningEntryIndicator size="large" visible={isTrackingOngoing} />
            </Typography>
          </Grid>
        )}
        {error && (
          <Grid>
            <SnackbarContent sx={{ mt: 3, bgcolor: 'error.main' }} message={error} />
          </Grid>
        )}
      </Grid>
      {Object.keys(timeEntriesByDate).length > 0 && (
        <TimeEntryContext.Provider value={timeEntryContext}>
          <CalendarGridContainer dateRange={dateRange} timeEntriesByDate={timeEntriesByDate} />
        </TimeEntryContext.Provider>
      )}
    </Box>
  );
}
