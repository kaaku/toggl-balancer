import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Duration from './Duration';
import CalendarGrid from './CalendarGrid';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 10
  }
});

function getTimeEntriesForMonth(timeEntriesByDate, month) {
  return Object.keys(timeEntriesByDate)
    .filter(date => moment(date).month() === month)
    .reduce((result, date) => Object.assign(result, { [date]: timeEntriesByDate[date] }), {});
}

function getDataByMonth(startDate, endDate, timeEntriesByDate) {
  const dataByMonth = [];
  let firstDayOfMonth = moment(startDate).startOf('month');
  while (firstDayOfMonth.isSameOrBefore(endDate, 'day')) {
    const timeEntriesForMonth = getTimeEntriesForMonth(timeEntriesByDate, firstDayOfMonth.month());
    dataByMonth.push({
      firstDayOfMonth,
      totalDiff: Object.values(timeEntriesForMonth).reduce((result, data) => result + data.duration, 0)
    });
    firstDayOfMonth = moment(firstDayOfMonth).add(1, 'month');
  }

  return dataByMonth;
}

const CalendarGridContainer = props => {
  const { startDate, endDate, timeEntriesByDate, classes } = props;
  if (startDate.isAfter(endDate)) {
    return null;
  }

  const dataByMonth = getDataByMonth(startDate, endDate, timeEntriesByDate);

  return (
    <Grid container justify="center" spacing={40} className={classes.root}>
      {dataByMonth.map(({ firstDayOfMonth, totalDiff }) => (
        <Grid item xs={12} lg={6} key={firstDayOfMonth.format('YYYY-MM')}>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h2" gutterBottom>
                {firstDayOfMonth.format('MMMM YYYY')}
              </Typography>
            </Grid>
            <Grid item>
              <Duration
                duration={totalDiff}
                useColors
                textProps={{
                  variant: 'h2',
                  gutterBottom: true
                }}
              />
            </Grid>
          </Grid>
          <CalendarGrid
            year={firstDayOfMonth.year()}
            month={firstDayOfMonth.month() + 1}
            timeEntriesByDate={getTimeEntriesForMonth(timeEntriesByDate, firstDayOfMonth.month())}
          />
        </Grid>
      ))}
    </Grid>
  );
};

CalendarGridContainer.propTypes = {
  startDate: PropTypes.instanceOf(moment).isRequired,
  endDate: PropTypes.instanceOf(moment).isRequired,
  timeEntriesByDate: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CalendarGridContainer);
