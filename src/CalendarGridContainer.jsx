import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Duration from './Duration';
import MonthView from './MonthView';

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

function toCalendarCellComponent(data) {
  return (
    <Duration
      duration={data.duration}
      useColors
      textProps={{
        variant: 'h6',
        align: 'center'
      }}
    />
  );
}

/**
 * @param timeEntriesByDate {Object}
 */
function getMonthViewData(timeEntriesByDate) {
  return Object.assign(
    {},
    ...Object.keys(timeEntriesByDate).map(date => ({ [date]: toCalendarCellComponent(timeEntriesByDate[date]) }))
  );
}

function getDefaultCellContent() {
  return (
    <Typography variant="h6" color="textSecondary" align="center">
      -
    </Typography>
  );
}

const CalendarGridContainer = props => {
  const { startDate, endDate, timeEntriesByDate, classes } = props;
  if (startDate.isAfter(endDate)) {
    return;
  }

  const dataByMonth = [];
  let firstDayOfMonth = moment(startDate).startOf('month');
  while (firstDayOfMonth.isBefore(endDate)) {
    const timeEntriesForMonth = getTimeEntriesForMonth(timeEntriesByDate, firstDayOfMonth.month());
    dataByMonth.push({
      firstDayOfMonth,
      totalDiff: Object.values(timeEntriesForMonth).reduce((result, data) => result + data.duration, 0),
      monthViewData: getMonthViewData(timeEntriesForMonth)
    });
    firstDayOfMonth = moment(firstDayOfMonth).add(1, 'month');
  }

  return (
    <Grid container justify="center" spacing={40} className={classes.root}>
      {dataByMonth.map(({ firstDayOfMonth, totalDiff, monthViewData }) => (
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
          <MonthView
            year={firstDayOfMonth.year()}
            month={firstDayOfMonth.month() + 1}
            data={monthViewData}
            defaultContent={getDefaultCellContent()}
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
