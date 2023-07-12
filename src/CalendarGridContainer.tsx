import Grid from '@mui/material/Unstable_Grid2';
import moment, { Moment } from 'moment';
import React from 'react';
import Typography from '@mui/material/Typography';

import Duration from './Duration';
import CalendarGrid from './CalendarGrid';
import { AggregateTimeEntries, DateRange } from './types';

interface Props {
  dateRange: DateRange;
  timeEntriesByDate: { [date: string]: AggregateTimeEntries };
}

function getTimeEntriesForMonth(
  timeEntriesByDate: { [date: string]: AggregateTimeEntries },
  month: number
): { [date: string]: AggregateTimeEntries } {
  return Object.keys(timeEntriesByDate)
    .filter((date) => moment(date).month() === month)
    .reduce((result, date) => Object.assign(result, { [date]: timeEntriesByDate[date] }), {});
}

function getDataByMonth(
  startDate: Moment,
  endDate: Moment,
  timeEntriesByDate: { [date: string]: AggregateTimeEntries }
) {
  const dataByMonth: { firstDayOfMonth: Moment; totalDiff: number }[] = [];
  let firstDayOfMonth = moment(startDate).startOf('month');
  while (firstDayOfMonth.isSameOrBefore(endDate, 'day')) {
    const timeEntriesForMonth = getTimeEntriesForMonth(timeEntriesByDate, firstDayOfMonth.month());
    dataByMonth.push({
      firstDayOfMonth,
      totalDiff: Object.values(timeEntriesForMonth).reduce((result, data) => result + (data.duration ?? 0), 0),
    });
    firstDayOfMonth = moment(firstDayOfMonth).add(1, 'month');
  }

  return dataByMonth;
}

export default function CalendarGridContainer(props: Props) {
  const {
    dateRange: { startDate, endDate },
    timeEntriesByDate,
  } = props;
  if (!startDate || !endDate || startDate.isAfter(endDate)) {
    return null;
  }

  const dataByMonth = getDataByMonth(startDate, endDate, timeEntriesByDate);

  return (
    <Grid container justifyContent="center" spacing={5}>
      {dataByMonth.map(({ firstDayOfMonth, totalDiff }) => (
        <Grid xs={12} xl={6} key={firstDayOfMonth.format('YYYY-MM')}>
          <Grid container justifyContent="space-between">
            <Grid>
              <Typography variant="h2" gutterBottom>
                {firstDayOfMonth.format('MMMM YYYY')}
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h2" gutterBottom>
                <Duration duration={totalDiff} useColors />
              </Typography>
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
}
