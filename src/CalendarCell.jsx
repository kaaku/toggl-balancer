import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import Duration from './Duration.tsx';
import RunningEntryIndicator from './RunningEntryIndicator';
import { TimeEntryContext } from './TimeEntryContext';
import { timeEntryStore } from './TimeEntryStore';

export default function CalendarCell(props) {
  const { date, duration, hasRunningEntry, disabled } = props;
  const hasDuration = Number.isSafeInteger(duration);
  const isCurrentDate = moment().isSame(date, 'day');

  const isWorkingDay = (workdayOverrides) => timeEntryStore.isWorkday(date, workdayOverrides, hasDuration);

  return (
    <TimeEntryContext.Consumer>
      {({ workdayOverrides, toggleWorkday }) => (
        <Paper sx={{ p: 1, height: '100%', ...(disabled && { bgcolor: 'action.disabledBackground' }) }}>
          <Box>
            <Box component="span" sx={{ display: 'inline-block', p: 3 / 8 }}>
              <Typography
                variant="overline"
                gutterBottom
                sx={{
                  p: 0.5,
                  ...(isCurrentDate && {
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 'medium',
                  }),
                }}
              >
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
                  sx={{ float: 'right', p: 1 }}
                />
              </Tooltip>
            )}
            <Box sx={{ float: 'right' }}>
              <RunningEntryIndicator size="small" visible={hasRunningEntry} />
            </Box>
          </Box>
          {hasDuration && (
            <Typography variant="h6" align="center">
              <Duration duration={duration} useColors />
            </Typography>
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
};

CalendarCell.defaultProps = {
  duration: null,
  hasRunningEntry: false,
  disabled: false,
};
