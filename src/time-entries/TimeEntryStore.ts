import moment, { Moment } from 'moment';
import { AggregateTimeEntries, DateRange, TimeEntry } from '../types';

const BASE_URL = 'https://api.track.toggl.com/api/v9/me/time_entries';

const workdayDuration = moment.duration('7:30').asSeconds();

// eslint-disable-next-line import/prefer-default-export
export const timeEntryStore = {
  fetchTimeEntries(dateRange: DateRange, apiToken: string, workdaySettings: { [date: string]: boolean }) {
    if (!dateRange?.startDate || !dateRange?.endDate) {
      throw Error('Either start date or end date is required');
    } else if (!apiToken) {
      throw Error('API token is required');
    }

    const start = moment(dateRange.startDate).startOf('day');
    const end = moment(dateRange.endDate).add(1, 'day').startOf('day');
    if ((start && !start.isValid()) || (end && !end.isValid())) {
      throw Error('Start date and/or end date were invalid');
    }

    const url = new URL(BASE_URL);
    const params: { start_date?: string; end_date?: string } = {};
    if (start) {
      params.start_date = start.format('YYYY-MM-DD');
    }
    if (end) {
      params.end_date = end.format('YYYY-MM-DD');
    }
    url.search = new URLSearchParams(params).toString();

    return (
      fetch(url, {
        method: 'GET',
        headers: new Headers({
          Authorization: `Basic ${btoa(`${apiToken}:api_token`)}`,
          'Content-Type': 'application/json',
        }),
      })
        .catch(() => {
          throw Error('Failed to fetch time entries, check your internet connection');
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          if (response.status === 403) {
            throw Error('Toggl authentication failed, maybe the API token is incorrect?');
          }
          throw Error(`Toggl responded with an unknown error (HTTP ${response.status})`);
        })
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        .then((timeEntries) => groupEntries(start, end, timeEntries, workdaySettings))
    );
  },

  refreshDurations(
    timeEntriesByDate: { [date: string]: AggregateTimeEntries } = {},
    workdayOverrides: { [date: string]: boolean } = {}
  ): { [date: string]: AggregateTimeEntries } {
    const refreshed: { [date: string]: AggregateTimeEntries } = {};

    Object.entries(timeEntriesByDate).forEach(([date, dataForDate]) => {
      const hasTimeEntries = dataForDate.timeEntries.length > 0;
      const isWorkday = this.isWorkday(date, workdayOverrides, hasTimeEntries);
      let duration = null;
      if (hasTimeEntries || isWorkday) {
        const baseDuration = dataForDate.timeEntries.map((entry) => entry.duration).reduce((a, b) => a + b, 0);
        duration = baseDuration + (isWorkday ? -workdayDuration : 0);
      }
      refreshed[date] = { ...dataForDate, duration };
    });

    return refreshed;
  },

  isWorkday(date: string, workdayOverrides: { [date: string]: boolean } = {}, hasTimeEntries = false) {
    // eslint-disable-next-line no-prototype-builtins
    if (workdayOverrides.hasOwnProperty(date)) {
      return workdayOverrides[date];
    }
    if ([6, 7].includes(moment(date).isoWeekday())) {
      return false;
    }

    return hasTimeEntries;
  },
};

function groupEntries(
  startDate: Moment,
  endDate: Moment,
  timeEntries: TimeEntry[],
  workdayOverrides: { [date: string]: boolean }
): { [date: string]: AggregateTimeEntries } {
  const timeEntriesByDate = timeEntries
    .map((entry) =>
      Object.assign(entry, {
        start: moment(entry.start),
        end: moment(entry.end),
        duration: entry.duration < 0 ? moment().unix() + entry.duration : entry.duration,
        isRunning: entry.duration < 0,
      })
    )
    .sort((a, b) => a.start.diff(b.start))
    .reduce((result: { [date: string]: AggregateTimeEntries }, entry: TimeEntry) => {
      const date = moment(entry.start).format('YYYY-MM-DD');
      const dataForDate = result[date] || {
        timeEntries: [],
        duration: timeEntryStore.isWorkday(date, workdayOverrides, true) ? -workdayDuration : 0,
        hasRunningEntry: false,
      };
      dataForDate.timeEntries.push(entry);
      dataForDate.duration = (dataForDate.duration ?? 0) + entry.duration;
      dataForDate.hasRunningEntry = dataForDate.hasRunningEntry || entry.isRunning;

      return Object.assign(result, { [date]: dataForDate });
    }, {});

  let date = startDate;
  while (date.isBefore(endDate, 'day')) {
    const dateString = date.format('YYYY-MM-DD');
    // eslint-disable-next-line no-prototype-builtins
    if (!timeEntriesByDate.hasOwnProperty(dateString)) {
      timeEntriesByDate[dateString] = {
        timeEntries: [],
        duration: timeEntryStore.isWorkday(dateString, workdayOverrides, false) ? -workdayDuration : null,
        hasRunningEntry: false,
      };
    }

    date = date.add(1, 'day');
  }

  return timeEntriesByDate;
}
