import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';

import Duration from './Duration.tsx';
import CalendarGrid from './CalendarGrid';

function getTimeEntriesForMonth(timeEntriesByDate, month) {
  return Object.keys(timeEntriesByDate)
    .filter((date) => moment(date).month() === month)
    .reduce((result, date) => Object.assign(result, { [date]: timeEntriesByDate[date] }), {});
}

function getDataByMonth(startDate, endDate, timeEntriesByDate) {
  const dataByMonth = [];
  let firstDayOfMonth = moment(startDate).startOf('month');
  while (firstDayOfMonth.isSameOrBefore(endDate, 'day')) {
    const timeEntriesForMonth = getTimeEntriesForMonth(timeEntriesByDate, firstDayOfMonth.month());
    dataByMonth.push({
      firstDayOfMonth,
      totalDiff: Object.values(timeEntriesForMonth).reduce((result, data) => result + data.duration, 0),
    });
    firstDayOfMonth = moment(firstDayOfMonth).add(1, 'month');
  }

  return dataByMonth;
}

export default function CalendarGridContainer(props) {
  const { startDate, endDate, timeEntriesByDate } = props;
  if (startDate.isAfter(endDate)) {
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

CalendarGridContainer.propTypes = {
  startDate: PropTypes.instanceOf(moment).isRequired,
  endDate: PropTypes.instanceOf(moment).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  timeEntriesByDate: PropTypes.object.isRequired,
};
