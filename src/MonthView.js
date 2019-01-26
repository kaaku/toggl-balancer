import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import moment from "moment";
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, {Component} from "react";
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        padding: 20
    },
    calendarCell: {
        padding: 10,
        height: '100%'
    },
    disabled: {
        backgroundColor: theme.palette.grey[200]
    }
});

class MonthView extends Component {
    constructor(props) {
        super(props);
        this.getDataForDate = this.getDataForDate.bind(this);
        this.isIncluded = this.isIncluded.bind(this);
    }

    render() {
        const {data, defaultContent, classes} = this.props;

        const firstDayOfMonth = moment({year: this.props.year, month: this.props.month - 1, day: 1});
        const firstVisibleDay = moment(firstDayOfMonth).startOf('week');
        const lastDayOfMonth = moment(firstDayOfMonth).endOf('month').startOf('day');
        const lastVisibleDay = moment(lastDayOfMonth).endOf('week').startOf('day');

        const dates = [], weeks = [];
        const gridCellCount = Math.round(moment.duration(lastVisibleDay.diff(firstVisibleDay)).asDays()) + 1;
        while (dates.length < gridCellCount) {
            dates.push(moment(firstVisibleDay).add(dates.length, 'days').format('YYYY-MM-DD'));
        }
        while (dates.length > 0) {
            weeks.push(dates.splice(0, 7));
        }

        return (
            <div className={classes.root}>
                <Typography variant='h2' gutterBottom>
                    {firstDayOfMonth.format('MMMM')} {firstDayOfMonth.year()}
                </Typography>
                {weeks.map(week =>
                    <Grid container spacing={16} key={moment(week[0]).week()}>
                        {week.map(date =>
                            <Grid item xs key={date}>
                                <Paper className={classNames(
                                    classes.calendarCell,
                                    {[classes.disabled]: !this.isIncluded(date)}
                                )}>
                                    <Typography variant='overline' gutterBottom>
                                        {moment(date).format('DD')}
                                    </Typography>
                                    {data[date] && data[date]}
                                    {!data[date] && defaultContent}
                                </Paper>
                            </Grid>)}
                    </Grid>)
                }
            </div>
        );
    }

    isIncluded(date) {
        return moment(date).month() + 1 === this.props.month;
    }

    getDataForDate(date) {
        return !this.props.data[date] ? '' :
            this.props.data[date].reduce((result, entry) => result + entry.duration, 0);
    }
}

MonthView.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
    data: PropTypes.shape({
        date: PropTypes.element
    }).isRequired,
    defaultContent: PropTypes.element
};

export default withStyles(styles, {withTheme: true})(MonthView);
