import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { withStyles } from '@material-ui/core/styles';

import Duration from './Duration';
import RunningEntryIndicator from './RunningEntryIndicator';
import { TimeEntryContext } from './TimeEntryContext';
import { timeEntryStore } from './TimeEntryStore';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
    height: '100%',
  },
  disabled: {
    backgroundColor: theme.palette.action.disabledBackground,
  },
  dayOfMonth: {
    display: 'inline-block',
    padding: theme.spacing(3 / 8),
    '& span': {
      padding: theme.spacing(0.5),
    },
  },
  today: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: theme.typography.fontWeightMedium,
  },
  indicator: {
    float: 'right',
  },
  overrideToggle: {
    float: 'right',
    padding: theme.spacing(1),
  },
});

function CalendarCell(props) {
  const { date, duration, hasRunningEntry, disabled, classes } = props;
  const hasDuration = Number.isSafeInteger(duration);
  const isCurrentDate = moment().isSame(date, 'day');

  const isWorkingDay = (workdayOverrides) => timeEntryStore.isWorkday(date, workdayOverrides, hasDuration);

  return (
    <TimeEntryContext.Consumer>
      {({ workdayOverrides, toggleWorkday }) => (
        <Paper className={classNames(classes.root, { [classes.disabled]: disabled })}>
          <Box>
            <Box component="span" className={classes.dayOfMonth}>
              <Typography variant="overline" gutterBottom className={classNames({ [classes.today]: isCurrentDate })}>
                {moment(date).format('DD')}
              </Typography>
            </Box>
            {!disabled && (
              <Tooltip
                title={isWorkingDay(workdayOverrides) ? 'Working day' : 'Non-working day'}
                placement="top"
                enterDelay={500}
              >
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  checked={isWorkingDay(workdayOverrides)}
                  onChange={() => toggleWorkday(date)}
                  className={classes.overrideToggle}
                  color="primary"
                />
              </Tooltip>
            )}
            <Box className={classes.indicator}>
              <RunningEntryIndicator size="small" visible={hasRunningEntry} />
            </Box>
          </Box>
          {hasDuration && (
            <Duration
              duration={duration}
              useColors
              textProps={{
                variant: 'h6',
                align: 'center',
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
}

CalendarCell.propTypes = {
  date: PropTypes.string.isRequired,
  duration: PropTypes.number,
  hasRunningEntry: PropTypes.bool,
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

CalendarCell.defaultProps = {
  duration: null,
  hasRunningEntry: false,
  disabled: false,
};

export default withStyles(styles, { withTheme: true })(CalendarCell);
