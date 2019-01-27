import moment from "moment";

const BASE_URL = 'https://www.toggl.com/api/v8/time_entries';

function fetchTimeEntries(startDate, endDate, apiToken) {
    if (!startDate && !endDate) {
        throw Error('Either start date or end date is required');
    } else if (!apiToken) {
        throw Error('API token is required');
    }

    const start = !startDate ? null : moment(startDate);
    const end = !endDate ? null : moment(endDate).add(1, 'day');
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
            'Authorization': 'Basic ' + btoa(`${apiToken}:api_token`),
            'Content-Type': 'application/json'
        })
    }).then(res => res.json());
}

export const TimeEntryStore = {fetchTimeEntries};