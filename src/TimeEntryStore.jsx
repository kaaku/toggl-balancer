import moment from 'moment';

const BASE_URL = 'https://www.toggl.com/api/v8/time_entries';

const workDayDuration = moment.duration('7:30').asSeconds();

function groupEntries(timeEntries) {
  return timeEntries
    .map(entry =>
      Object.assign(entry, {
        start: moment(entry.start),
        end: moment(entry.end),
        duration: entry.duration < 0 ? moment().unix() + entry.duration : entry.duration,
        isRunning: entry.duration < 0
      })
    )
    .sort((a, b) => a.start.diff(b.start))
    .reduce((result, entry) => {
      const date = moment(entry.start).format('YYYY-MM-DD');
      const dataForDate = result[date] || { timeEntries: [], duration: -workDayDuration, hasRunningEntry: false };
      dataForDate.timeEntries.push(entry);
      dataForDate.duration += entry.duration;
      dataForDate.hasRunningEntry = dataForDate.hasRunningEntry || entry.isRunning;

      return Object.assign(result, { [date]: dataForDate });
    }, {});
}

export default {
  fetchTimeEntries(startDate, endDate, apiToken) {
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

    return fetch(url, {
      method: 'GET',
      headers: new Headers({
        Authorization: `Basic ${btoa(`${apiToken}:api_token`)}`,
        'Content-Type': 'application/json'
      })
    })
      .then(res => res.json())
      .then(groupEntries);
  }
};
