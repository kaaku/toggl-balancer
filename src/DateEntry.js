import moment from "moment";
import PropTypes from 'prop-types';
import React from "react";

const workDayDuration = moment.duration('7:30').asSeconds();

const DateEntry = (props) => {
    const loggedTime = props.timeEntries.map(timeEntry => timeEntry.duration).reduce((a, b) => a + b, 0);
    const delta = loggedTime - workDayDuration;

    const loggedTimePretty = moment.utc(loggedTime * 1000).format('HH:mm:ss');
    const deltaPretty = (delta < 0 ? '-' : '+') + moment.utc(Math.abs(delta) * 1000).format('HH:mm:ss');

    return (
        <div>
            {props.date}, {loggedTimePretty}, {deltaPretty}
        </div>
    );
};

DateEntry.propTypes = {
    date: PropTypes.string.isRequired,
    timeEntries: PropTypes.array.isRequired
};

export default DateEntry;
