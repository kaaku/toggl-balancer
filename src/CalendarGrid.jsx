import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  calendarCell: {
    padding: 10,
    height: '100%'
  },
  dayOfMonth: {
    padding: 3
  },
  today: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightMedium
  },
  disabled: {
    backgroundColor: theme.palette.action.disabledBackground
  }
});

const CalendarGrid = props => {
  const { year, month, data, defaultContent, classes } = props;

  const firstDayOfMonth = moment({ year, month: month - 1, day: 1 });
  const firstVisibleDay = moment(firstDayOfMonth).startOf('week');
  const lastDayOfMonth = moment(firstDayOfMonth)
    .endOf('month')
    .startOf('day');
  const lastVisibleDay = moment(lastDayOfMonth)
    .endOf('week')
    .startOf('day');

  const dates = [];
  const weeks = [];
  const gridCellCount = Math.round(moment.duration(lastVisibleDay.diff(firstVisibleDay)).asDays()) + 1;
  while (dates.length < gridCellCount) {
    dates.push(
      moment(firstVisibleDay)
        .add(dates.length, 'days')
        .format('YYYY-MM-DD')
    );
  }
  while (dates.length > 0) {
    weeks.push(dates.splice(0, 7));
  }

  return (
    <React.Fragment>
      {weeks.map(week => (
        <Grid container spacing={16} key={moment(week[0]).week()}>
          {week.map(date => (
            <Grid item xs key={date}>
              <Paper
                className={classNames(classes.calendarCell, { [classes.disabled]: moment(date).month() + 1 !== month })}
              >
                <Typography
                  variant="overline"
                  inline
                  gutterBottom
                  className={classNames(classes.dayOfMonth, { [classes.today]: moment().isSame(date, 'day') })}
                >
                  {moment(date).format('DD')}
                </Typography>
                {data[date] && data[date]}
                {!data[date] && moment(date).month() + 1 === month && defaultContent}
              </Paper>
            </Grid>
          ))}
        </Grid>
      ))}
    </React.Fragment>
  );
};

CalendarGrid.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
  data: PropTypes.shape({
    date: PropTypes.element
  }).isRequired,
  defaultContent: PropTypes.element
};

export default withStyles(styles, { withTheme: true })(CalendarGrid);
