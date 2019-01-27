import Grid from "@material-ui/core/Grid";
import moment from "moment";
import MonthView from "./MonthView";
import PropTypes from 'prop-types';
import React from 'react';
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

import Duration from "./Duration";

const workDayDuration = moment.duration('7:30').asSeconds();
const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 10
    }
});

const CalendarGrid = (props) => {
    const {startDate, endDate, timeEntries, classes} = props;
    if (startDate.isAfter(endDate)) {
        return;
    }

    const dataByMonth = [];
    let firstDayOfMonth = moment(startDate).startOf('month');
    while (firstDayOfMonth.isBefore(endDate)) {
        const timeDiffsByDate = getTimeDiffsByDate(firstDayOfMonth, timeEntries);
        dataByMonth.push({
            firstDayOfMonth: firstDayOfMonth,
            totalDiff: Object.values(timeDiffsByDate).reduce((result, diff) => result + diff, 0),
            monthViewData: getMonthViewData(timeDiffsByDate)
        });
        firstDayOfMonth = moment(firstDayOfMonth).add(1, 'month');
    }

    return (
        <Grid container justify='center' spacing={40} className={classes.root}>
            {dataByMonth.map(({firstDayOfMonth, totalDiff, monthViewData}) => (
                <Grid item xs={12} lg={6} key={firstDayOfMonth.format('YYYY-MM')}>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Typography variant='h2' gutterBottom>
                                {firstDayOfMonth.format('MMMM YYYY')}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Duration duration={totalDiff} useColors textProps={{variant: 'h2', gutterBottom: true}}/>
                        </Grid>
                    </Grid>
                    <MonthView year={firstDayOfMonth.year()}
                               month={firstDayOfMonth.month() + 1}
                               data={monthViewData}
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
function getTimeDiffsByDate(month, timeEntries) {
    return timeEntries
        .filter(entry => moment(entry.start).isSame(month, 'month'))
        .reduce((result, entry) => {
            const date = moment(entry.start).format('YYYY-MM-DD');
            result[date] = (result[date] || -workDayDuration) + entry.duration;
            return result;
        }, {});
}

/**
 * @param timeDiffsByDate {Object}
 */
function getMonthViewData(timeDiffsByDate) {
    return Object.assign({}, ...Object.keys(timeDiffsByDate)
        .map(date => ({[date]: toCalendarCellComponent(timeDiffsByDate[date])})));
}

/**
 * @param duration {Number}
 */
function toCalendarCellComponent(duration) {
    return (<Duration duration={duration} useColors textProps={{variant: 'h6', align: 'center'}}/>);
}

function getDefaultCellContent() {
    return (<Typography variant='h6' color='textSecondary' align='center'>-</Typography>);
}

CalendarGrid.propTypes = {
    startDate: PropTypes.instanceOf(moment).isRequired,
    endDate: PropTypes.instanceOf(moment).isRequired,
    timeEntries: PropTypes.array.isRequired
};

export default withStyles(styles, {withTheme: true})(CalendarGrid);
