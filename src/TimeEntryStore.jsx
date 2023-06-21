import moment from 'moment';

const BASE_URL = 'https://api.track.toggl.com/api/v9/me/time_entries';

const workdayDuration = moment.duration('7:30').asSeconds();

// eslint-disable-next-line import/prefer-default-export
export const timeEntryStore = {
  fetchTimeEntries(startDate, endDate, apiToken, workdaySettings) {
    if (!startDate && !endDate) {
      throw Error('Either start date or end date is required');
    } else if (!apiToken) {
      throw Error('API token is required');
    }

    const start = !startDate ? null : moment(startDate).startOf('day');
    const end = !endDate ? null : moment(endDate).add(1, 'day').startOf('day');
    if ((start && !start.isValid()) || (end && !end.isValid())) {
      throw Error('Start date and/or end date were invalid');
    }

    const url = new URL(BASE_URL);
    const params = {};
    if (start) {
      params.start_date = start.toISOString();
    }
    if (end) {
      params.end_date = end.toISOString();
    }
    url.search = new URLSearchParams(params);

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
        // eslint-disable-next-line no-use-before-define
        .then((timeEntries) => groupEntries(start, end, timeEntries, workdaySettings))
    );
  },

  refreshDurations(timeEntriesByDate = {}, workdayOverrides = {}) {
    const refreshed = {};

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

  isWorkday(date, workdayOverrides = {}, hasTimeEntries = false) {
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

function groupEntries(startDate, endDate, timeEntries, workdayOverrides) {
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
    .reduce((result, entry) => {
      const date = moment(entry.start).format('YYYY-MM-DD');
      const dataForDate = result[date] || {
        timeEntries: [],
        duration: timeEntryStore.isWorkday(date, workdayOverrides, true) ? -workdayDuration : 0,
        hasRunningEntry: false,
      };
      dataForDate.timeEntries.push(entry);
      dataForDate.duration += entry.duration;
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
