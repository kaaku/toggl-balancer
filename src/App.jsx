import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import React, { Component } from 'react';
import SnackbarContent from '@material-ui/core/es/SnackbarContent/SnackbarContent';
import Typography from '@material-ui/core/es/Typography/Typography';
import { withStyles } from '@material-ui/core/styles';

import ApiTokenDialog from './ApiTokenDialog';
import CalendarGrid from './CalendarGrid';
import DateRangeSelector, { defaultDateRange } from './DateRangeSelector';
import TimeEntryStore from './TimeEntryStore';
import Duration from './Duration';
import RunningEntryIndicator from './RunningEntryIndicator';
import './styles.css';

const styles = theme => ({
  dateSelectorContainer: {
    marginTop: theme.spacing.unit * 5
  },
  totalTimeDiff: {
    marginTop: theme.spacing.unit * 3
  },
  errorNotification: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.error.main
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    const { apiToken, startDate, endDate } = localStorage;
    const dateRange =
      startDate && endDate ? { startDate: moment(startDate), endDate: moment(endDate) } : defaultDateRange;
    this.state = Object.assign({ apiToken, timeEntriesByDate: {} }, dateRange);

    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleDateRangeChange = this.handleDateRangeChange.bind(this);
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

  updateTimeEntries() {
    const { startDate, endDate, apiToken } = this.state;
    try {
      TimeEntryStore.fetchTimeEntries(startDate, endDate, apiToken).then(
        result => this.setState({ timeEntriesByDate: result }),
        error => this.setState({ error: error.message })
      );
    } catch ({ message }) {
      this.setState({ error: message });
    }
  }

  handleDialogClose(apiToken, rememberMe) {
    if (rememberMe) {
      localStorage.setItem('apiToken', apiToken);
    }
    this.setState({ apiToken });
  }

  handleDateRangeChange(dateRange) {
    Object.keys(dateRange).forEach(key => localStorage.setItem(key, dateRange[key].format('YYYY-MM-DD')));
    this.setState(dateRange);
  }

  render() {
    const { startDate, endDate, apiToken, timeEntriesByDate, error } = this.state;
    const { classes } = this.props;

    if (!apiToken) {
      return <ApiTokenDialog open={!apiToken} mandatory={!apiToken} onClose={this.handleDialogClose} />;
    }

    const totalTimeDiff = Object.values(timeEntriesByDate).reduce((sum, entry) => sum + entry.duration, 0);
    const isTrackingOngoing = Object.values(timeEntriesByDate).some(entry => entry.hasRunningEntry);

    return (
      <React.Fragment>
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
          <CalendarGrid startDate={startDate} endDate={endDate} timeEntriesByDate={timeEntriesByDate} />
        )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
