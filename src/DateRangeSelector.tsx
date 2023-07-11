import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import React from 'react';
import { DateRange } from './types';

interface Props {
  dateRange: DateRange;
  onChange: (dateRange: DateRange) => void;
}

const quickSelections = [
  {
    title: 'Last month',
    getDateRange: () => ({
      startDate: moment().subtract(1, 'month').startOf('month'),
      endDate: moment().startOf('month').subtract(1, 'day'),
    }),
  },
  {
    title: 'This month',
    getDateRange: () => ({
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month').startOf('day'),
    }),
  },
  {
    title: 'This year',
    getDateRange: () => ({
      startDate: moment().startOf('year'),
      endDate: moment().endOf('month').startOf('day'),
    }),
  },
];

export default function DateRangeSelector(props: Props) {
  const {
    dateRange: { startDate, endDate },
    onChange,
  } = props;
  const currentYear = moment().year();
  // Toggl Time Entry API only supports fetching data for the previous 90 days
  const minDate = moment().subtract(91, 'days');

  return (
    <Paper sx={{ p: 5 }}>
      <Grid container justifyContent="space-evenly" spacing={5}>
        <Grid>
          <DatePicker
            label="From"
            format={startDate && startDate.year() !== currentYear ? 'MMMM Do, YYYY' : 'MMMM Do'}
            value={startDate}
            minDate={minDate}
            maxDate={endDate}
            slotProps={{
              actionBar: { actions: ['today'] },
            }}
            onChange={(date) =>
              onChange({
                startDate: date,
                endDate,
              })
            }
          />
        </Grid>
        <Grid>
          <DatePicker
            label="To"
            format={endDate && endDate.year() !== currentYear ? 'MMMM Do, YYYY' : 'MMMM Do'}
            value={endDate}
            minDate={startDate}
            slotProps={{
              actionBar: { actions: ['today'] },
            }}
            onChange={(date) =>
              onChange({
                startDate,
                endDate: date,
              })
            }
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="space-evenly" spacing={5} sx={{ mt: 2 }}>
        {quickSelections.map((selection) => (
          <Grid key={selection.title}>
            <Button onClick={() => onChange(selection.getDateRange())}>{selection.title}</Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}
