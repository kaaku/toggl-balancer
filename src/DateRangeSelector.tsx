import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Unstable_Grid2';
import moment, { Moment } from 'moment';
import Paper from '@mui/material/Paper';
import React from 'react';

interface Props {
  startDate?: Moment;
  endDate?: Moment;
  onChange: (dateRange: { startDate?: Moment; endDate?: Moment }) => void;
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
    default: true,
  },
  {
    title: 'This year',
    getDateRange: () => ({
      startDate: moment().startOf('year'),
      endDate: moment().endOf('month').startOf('day'),
    }),
  },
];

export function DateRangeSelector(props: Props) {
  const { startDate, endDate, onChange } = props;
  const currentYear = moment().year();

  return (
    <Paper sx={{ p: 5 }}>
      <Grid container justifyContent="space-evenly" spacing={5}>
        <Grid>
          <DatePicker
            label="From"
            format={startDate && startDate.year() !== currentYear ? 'MMMM Do, YYYY' : 'MMMM Do'}
            value={startDate}
            maxDate={endDate}
            slotProps={{
              actionBar: { actions: ['today'] },
            }}
            onChange={(date) =>
              onChange({
                startDate: date ?? undefined,
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
                endDate: date ?? undefined,
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

export const defaultDateRange = quickSelections.find((selection) => selection.default)?.getDateRange();
