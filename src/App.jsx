import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';
import React, { Component } from 'react';
import SnackbarContent from '@mui/material/SnackbarContent';
import Typography from '@mui/material/Typography';

import ApiTokenDialog from './ApiTokenDialog';
import CalendarGridContainer from './CalendarGridContainer';
import { DateRangeSelector, defaultDateRange } from './DateRangeSelector';
import { timeEntryStore } from './TimeEntryStore';
import Duration from './Duration';
import RunningEntryIndicator from './RunningEntryIndicator';
import { TimeEntryContext } from './TimeEntryContext';
import './styles.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    const { apiToken, startDate, endDate, workdayOverrides: workdayOverridesString } = localStorage;
    let workdayOverrides = {};
    try {
      if (workdayOverridesString) {
        workdayOverrides = JSON.parse(workdayOverridesString);
      }
    } catch (e) {
      workdayOverrides = {};
    }
    const dateRange =
      startDate && endDate ? { startDate: moment(startDate), endDate: moment(endDate) } : defaultDateRange;

    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
    this.toggleWorkday = this.toggleWorkday.bind(this);

    this.state = {
      apiToken,
      showApiTokenDialog: !apiToken,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      timeEntryContext: { timeEntriesByDate: {}, workdayOverrides, toggleWorkday: this.toggleWorkday },
    };
  }

  componentDidMount() {
    const { apiToken } = this.state;
    if (apiToken) {
      this.updateTimeEntries();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { startDate, endDate, apiToken } = this.state;
    if (prevState.startDate !== startDate || prevState.endDate !== endDate || prevState.apiToken !== apiToken) {
      this.updateTimeEntries();
    }
  }

  handleDialogClose({ apiToken, rememberMe }) {
    const stateChange = { showApiTokenDialog: false };
    if (apiToken) {
      if (rememberMe) {
        localStorage.setItem('apiToken', apiToken);
      } else {
        localStorage.removeItem('apiToken');
      }
      Object.assign(stateChange, { apiToken });
    }
    this.setState(stateChange);
  }

  handleDateRangeChange(dateRange) {
    Object.keys(dateRange).forEach((key) => localStorage.setItem(key, dateRange[key].format('YYYY-MM-DD')));
    this.setState(dateRange);
  }

  toggleWorkday(date) {
    const {
      timeEntryContext,
      timeEntryContext: { workdayOverrides, timeEntriesByDate },
    } = this.state;

    const oldSetting = timeEntryStore.isWorkday(date, workdayOverrides, timeEntriesByDate[date].timeEntries.length > 0);
    const newWorkdayOverrides = { ...workdayOverrides, [date]: !oldSetting };
    const refreshedTimeEntries = timeEntryStore.refreshDurations(timeEntriesByDate, newWorkdayOverrides);

    localStorage.setItem('workdayOverrides', JSON.stringify(newWorkdayOverrides));
    this.setState({
      timeEntryContext: {
        ...timeEntryContext,
        timeEntriesByDate: refreshedTimeEntries,
        workdayOverrides: newWorkdayOverrides,
      },
    });
  }

  updateTimeEntries() {
    const { startDate, endDate, apiToken, timeEntryContext } = this.state;
    try {
      timeEntryStore.fetchTimeEntries(startDate, endDate, apiToken, timeEntryContext.workdayOverrides).then(
        (result) =>
          this.setState({
            timeEntryContext: { ...timeEntryContext, timeEntriesByDate: result },
            error: undefined,
          }),
        (error) =>
          this.setState({
            timeEntryContext: { ...timeEntryContext, timeEntriesByDate: {} },
            error: error.message,
          })
      );
    } catch ({ message }) {
      this.setState({ error: message });
    }
  }

  render() {
    const {
      startDate,
      endDate,
      apiToken,
      showApiTokenDialog,
      timeEntryContext,
      timeEntryContext: { timeEntriesByDate },
      error,
    } = this.state;

    if (!apiToken) {
      return <ApiTokenDialog mandatory onClose={this.handleDialogClose} />;
    }

    const totalTimeDiff = Object.values(timeEntriesByDate).reduce((sum, entry) => sum + entry.duration, 0);
    const isTrackingOngoing = Object.values(timeEntriesByDate).some((entry) => entry.hasRunningEntry);

    return (
      <Box sx={{ padding: 4 }}>
        <ApiTokenDialog
          open={showApiTokenDialog}
          mandatory={false}
          oldApiToken={apiToken}
          onClose={this.handleDialogClose}
        />
        <Button
          sx={{ position: 'absolute', top: (theme) => theme.spacing(2), right: (theme) => theme.spacing(2) }}
          onClick={() => this.setState({ showApiTokenDialog: true })}
        >
          Change API Token
        </Button>
        <Grid container justifyContent="center" sx={{ mt: 5, mb: 10 }}>
          <Grid>
            <DateRangeSelector startDate={startDate} endDate={endDate} onChange={this.handleDateRangeChange} />
          </Grid>
          {!startDate.isSame(endDate, 'month') && (
            <Grid xs={12}>
              <Typography variant="h2" align="center" sx={{ mt: 3 }}>
                Total: <Duration duration={totalTimeDiff} useColors textProps={{ variant: 'inherit', inline: true }} />
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
            <CalendarGridContainer startDate={startDate} endDate={endDate} timeEntriesByDate={timeEntriesByDate} />
          </TimeEntryContext.Provider>
        )}
      </Box>
    );
  }
}
