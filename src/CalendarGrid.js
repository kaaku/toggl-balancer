import Grid from "@material-ui/core/Grid";
import moment from "moment";
import MonthView from "./MonthView";
import PropTypes from 'prop-types';
import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

import Duration from "./Duration";

const workDayDuration = moment.duration('7:30').asSeconds();

const CalendarGrid = (props) => {
    const {startDate, endDate, timeEntries} = props;
    if (startDate.isAfter(endDate)) {
        return;
    }

    const entriesByMonth = new Map();
    let month = moment(startDate).startOf('month');
    while (month.isBefore(endDate)) {
        entriesByMonth.set(month, getCalendarComponentsForMonth(month, timeEntries));
        month = moment(month).add(1, 'month');
    }

    return (
        <Grid container spacing={40}>
            {[...entriesByMonth.entries()].map(entry => (
                <Grid item xs={12} lg={6} key={`${entry[0].year()}-${entry[0].month() + 1}`}>
                    <MonthView year={entry[0].year()}
                               month={entry[0].month() + 1}
                               data={entry[1]}
                               defaultContent={getDefaultCellContent()}/>
                </Grid>
            ))}
        </Grid>
    );
};

/**
 * @param month {moment.Moment}
 * @param timeEntries {Array}
 */
function getCalendarComponentsForMonth(month, timeEntries) {
    const loggedTimeByDate = timeEntries
        .filter(entry => moment(entry.start).isSame(month, 'month'))
        .reduce((result, entry) => {
            const date = moment(entry.start).format('YYYY-MM-DD');
            result[date] = (result[date] || -workDayDuration) + entry.duration;
            return result;
        }, {});

    return Object.assign({}, ...Object.keys(loggedTimeByDate)
        .map(date => ({[date]: toComponent(loggedTimeByDate[date])})));
}

/**
 * @param duration {Number}
 */
function toComponent(duration) {
    return (
        <Typography variant='h6' align='center'>
            <Duration time={duration} useColors/>
        </Typography>
    );
}

function getDefaultCellContent() {
    return (<Typography variant='h6' color='textSecondary' align='center'>-</Typography>);
}

CalendarGrid.propTypes = {
    startDate: PropTypes.instanceOf(moment).isRequired,
    endDate: PropTypes.instanceOf(moment).isRequired,
    timeEntries: PropTypes.array.isRequired
};

export default withStyles({}, {withTheme: true})(CalendarGrid);
