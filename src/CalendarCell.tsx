import moment from 'moment';
import React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import Duration from './Duration';
import RunningEntryIndicator from './RunningEntryIndicator';
import { TimeEntryContext } from './time-entries/TimeEntryContext';
import { timeEntryStore } from './time-entries/TimeEntryStore';

interface Props {
  date: string;
  duration?: number | null;
  hasRunningEntry?: boolean;
  disabled?: boolean;
}

export default function CalendarCell({ date, duration = null, hasRunningEntry = false, disabled = false }: Props) {
  const hasDuration = Number.isSafeInteger(duration);
  const isCurrentDate = moment().isSame(date, 'day');

  const isWorkingDay = (workdayOverrides: Record<string, boolean>) =>
    timeEntryStore.isWorkday(date, workdayOverrides, hasDuration);

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
