import classNames from 'classnames';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

import Duration from './Duration';
import RunningEntryIndicator from './RunningEntryIndicator';
import { TimeEntryContext } from './TimeEntryContext';
import { timeEntryStore } from './TimeEntryStore';

const styles = theme => ({
  calendarCell: {
    padding: 10,
    height: '100%'
  },
  disabled: {
    backgroundColor: theme.palette.action.disabledBackground
  },
  dayOfMonth: {
    padding: 3
  },
  today: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightMedium
  }
});

const CalendarCell = props => {
  const { date, duration, hasRunningEntry, disabled, classes } = props;
  const isCurrentDate = moment().isSame(date, 'day');
  const hasDuration = Number.isSafeInteger(duration);

  return (
    <TimeEntryContext.Consumer>
      {({ workdayOverrides, toggleWorkday }) => (
        <Paper className={classNames(classes.calendarCell, { [classes.disabled]: disabled })}>
          <Typography
            variant="overline"
            inline
            gutterBottom
            className={classNames(classes.dayOfMonth, { [classes.today]: isCurrentDate })}
          >
            {moment(date).format('DD')}
          </Typography>
          <RunningEntryIndicator size="small" visible={hasRunningEntry} />
          {!disabled && (
            <Switch
              checked={timeEntryStore.isWorkday(date, workdayOverrides, hasDuration)}
              onChange={() => toggleWorkday(date)}
              color="primary"
            />
          )}
          {hasDuration && (
            <Duration
              duration={duration}
              useColors
              textProps={{
                variant: 'h6',
                align: 'center'
              }}
            />
          )}
          {!disabled && !hasDuration && (
            <Typography variant="h6" color="textSecondary" align="center">
              -
            </Typography>
          )}
        </Paper>
      )}
    </TimeEntryContext.Consumer>
  );
};

CalendarCell.propTypes = {
  date: PropTypes.string.isRequired,
  duration: PropTypes.number,
  hasRunningEntry: PropTypes.bool,
  disabled: PropTypes.bool,
  classes: PropTypes.object.isRequired
};

CalendarCell.defaultProps = {
  duration: null,
  hasRunningEntry: false,
  disabled: false
};

export default withStyles(styles, { withTheme: true })(CalendarCell);
