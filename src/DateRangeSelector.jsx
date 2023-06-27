import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import React from 'react';

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

export function DateRangeSelector(props) {
  const { startDate, endDate, onChange } = props;
  const currentYear = moment().year();

  return (
    <Paper sx={{ p: 5 }}>
      <Grid container justifyContent="space-evenly" spacing={5}>
        <Grid item>
          <DatePicker
            label="From"
            format={startDate && startDate.year() !== currentYear ? 'MMMM Do, YYYY' : 'MMMM Do'}
            value={startDate}
            maxDate={endDate}
            autoOk
            showTodayButton
            onChange={(date) =>
              onChange({
                startDate: date,
                endDate,
              })
            }
          />
        </Grid>
        <Grid item>
          <DatePicker
            label="To"
            format={endDate && endDate.year() !== currentYear ? 'MMMM Do, YYYY' : 'MMMM Do'}
            value={endDate}
            minDate={startDate}
            autoOk
            showTodayButton
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
          <Grid item key={selection.title}>
            <Button onClick={() => onChange(selection.getDateRange())}>{selection.title}</Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

DateRangeSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  startDate: PropTypes.instanceOf(moment),
  // eslint-disable-next-line react/require-default-props
  endDate: PropTypes.instanceOf(moment),
};

export const defaultDateRange = quickSelections.find((selection) => selection.default).getDateRange();
