import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import React, { Component } from 'react';
import SnackbarContent from '@material-ui/core/es/SnackbarContent/SnackbarContent';
import Typography from '@material-ui/core/es/Typography/Typography';

import { withStyles } from '@material-ui/core/styles';
import ApiTokenDialog from './ApiTokenDialog';
import CalendarGridContainer from './CalendarGridContainer';
import DateRangeSelector, { defaultDateRange } from './DateRangeSelector';
import { timeEntryStore } from './TimeEntryStore';
import Duration from './Duration';
import RunningEntryIndicator from './RunningEntryIndicator';
import { TimeEntryContext } from './TimeEntryContext';
import './styles.css';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  changeApiToken: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  dateSelectorContainer: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
  },
  totalTimeDiff: {
    marginTop: theme.spacing(3),
  },
  errorNotification: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.error.main,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    const { apiToken, startDate, endDate, workdayOverrides: workdayOverridesString } = localStorage;
    let workdayOverrides = {};
    try {
      if (workdayOverridesString) {
        workdayOverrides = JSON.parse(workdayOverridesString);
      }
    } catch (e) {
      console.warn(`Couldn't parse workday overrides from localStorage: ${workdayOverridesString}`);
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
    const { classes } = this.props;

    if (!apiToken) {
      return <ApiTokenDialog mandatory onClose={this.handleDialogClose} />;
    }

    const totalTimeDiff = Object.values(timeEntriesByDate).reduce((sum, entry) => sum + entry.duration, 0);
    const isTrackingOngoing = Object.values(timeEntriesByDate).some((entry) => entry.hasRunningEntry);

    return (
      <Box className={classes.root}>
        <ApiTokenDialog
          open={showApiTokenDialog}
          mandatory={false}
          oldApiToken={apiToken}
          onClose={this.handleDialogClose}
        />
        <Button
          className={classes.changeApiToken}
          color="primary"
          onClick={() => this.setState({ showApiTokenDialog: true })}
        >
          Change API Token
        </Button>
        <Grid container justify="center" className={classes.dateSelectorContainer}>
          <Grid item>
            <DateRangeSelector startDate={startDate} endDate={endDate} onChange={this.handleDateRangeChange} />
          </Grid>
          {!startDate.isSame(endDate, 'month') && (
            <Grid item xs={12}>
              <Typography variant="h2" align="center" className={classes.totalTimeDiff}>
                Total: <Duration duration={totalTimeDiff} useColors textProps={{ variant: 'inherit', inline: true }} />
                <RunningEntryIndicator size="large" visible={isTrackingOngoing} />
              </Typography>
            </Grid>
          )}
          {error && (
            <Grid item>
              <SnackbarContent className={classes.errorNotification} message={error} />
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

export default withStyles(styles, { withTheme: true })(App);
