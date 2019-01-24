import moment from "moment";
import PropTypes from 'prop-types';
import React from "react";
import Typography from '@material-ui/core/Typography';

const workDayDuration = moment.duration('7:30').asSeconds();

const DateEntry = (props) => {
    const loggedTime = props.timeEntries.map(timeEntry => timeEntry.duration).reduce((a, b) => a + b, 0);
    const delta = loggedTime === 0 ? null : (loggedTime - workDayDuration);

    const deltaPretty = !delta ? '-' : (delta < 0 ? '-' : '+') + moment.utc(Math.abs(delta) * 1000).format('H:mm');
    const deltaColor = !delta ? 'textSecondary' : (delta < 0 ? 'error' : 'primary');

    return (
        <div>
            <Typography variant='overline' gutterBottom>{moment(props.date).format('DD')}</Typography>
            <Typography variant='h6' align='center' color={deltaColor}>{deltaPretty}</Typography>
        </div>
    );
};

DateEntry.propTypes = {
    date: PropTypes.string.isRequired,
    timeEntries: PropTypes.array.isRequired
};

export default DateEntry;
