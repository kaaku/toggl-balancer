import Grid from '@mui/material/Unstable_Grid2';
import moment, { Moment } from 'moment';
import React from 'react';

import CalendarCell from './CalendarCell';
import { AggregateTimeEntries } from './time-entries/TimeEntryStore';

interface Props {
  year: number;
  month: number;
  timeEntriesByDate: { [date: string]: AggregateTimeEntries };
}

function getDurationData(
  timeEntriesByDate: { [date: string]: AggregateTimeEntries },
  fromDate: Moment,
  toDate: Moment
): { [date: string]: AggregateTimeEntries } {
  const durationData: { [date: string]: AggregateTimeEntries } = {};
  let date = moment(fromDate);
  while (date.isSameOrBefore(toDate, 'day')) {
    const dateString = date.format('YYYY-MM-DD');
    durationData[dateString] = { ...timeEntriesByDate[dateString] };
    date = date.add(1, 'day');
  }

  return durationData;
}

export default function CalendarGrid(props: Props) {
  const { year, month, timeEntriesByDate } = props;

  const firstDayOfMonth = moment({ year, month: month - 1, day: 1 });
  const firstVisibleDay = moment(firstDayOfMonth).startOf('week');
  const lastDayOfMonth = moment(firstDayOfMonth).endOf('month').startOf('day');
  const lastVisibleDay = moment(lastDayOfMonth).endOf('week').startOf('day');

  const dates = [];
  const weeks = [];
  const gridCellCount = Math.round(moment.duration(lastVisibleDay.diff(firstVisibleDay)).asDays()) + 1;
  while (dates.length < gridCellCount) {
    dates.push(moment(firstVisibleDay).add(dates.length, 'days').format('YYYY-MM-DD'));
  }
  while (dates.length > 0) {
    weeks.push(dates.splice(0, 7));
  }

  const durationData = getDurationData(timeEntriesByDate, firstVisibleDay, lastVisibleDay);

  return (
    <>
      {weeks.map((week) => (
        <Grid container spacing={1} key={moment(week[0]).week()}>
          {week.map((date) => (
            <Grid xs key={date}>
              <CalendarCell
                date={date}
                duration={durationData[date].duration}
                hasRunningEntry={durationData[date].hasRunningEntry}
                disabled={!firstDayOfMonth.isSame(date, 'month')}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </>
  );
}
