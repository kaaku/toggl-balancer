import Button from "@material-ui/core/Button";
import {DatePicker} from 'material-ui-pickers';
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import PropTypes from 'prop-types';
import React from 'react';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 5
    },
    quickSelections: {
        marginTop: theme.spacing.unit * 2
    }
});

const quickSelections = [
    {
        title: 'Last month',
        getDateRange: () => ({
            startDate: moment().subtract(1, 'month').startOf('month'),
            endDate: moment().startOf('month').subtract(1, 'day')
        })
    },
    {
        title: 'This month',
        getDateRange: () => ({
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month').startOf('day')
        }),
        default: true
    },
    {
        title: 'This year',
        getDateRange: () => ({
            startDate: moment().startOf('year'),
            endDate: moment().endOf('month').startOf('day')
        })
    }
];

const DateRangeSelector = (props) => {
    const {startDate, endDate, onChange, classes} = props;

    return (
        <Paper className={classes.root}>
            <Grid container justify='space-evenly' spacing={40}>
                <Grid item>
                    <DatePicker label='From'
                                value={startDate}
                                maxDate={endDate}
                                autoOk
                                showTodayButton
                                onChange={date => onChange({startDate: date, endDate})}/>
                </Grid>
                <Grid item>
                    <DatePicker label='To'
                                value={endDate}
                                minDate={startDate}
                                autoOk
                                showTodayButton
                                onChange={date => onChange({startDate, endDate: date})}/>
                </Grid>
            </Grid>
            <Grid container justify='space-evenly' spacing={40} className={classes.quickSelections}>
                {quickSelections.map(selection =>
                    (<Grid item key={selection.title}>
                        <Button onClick={() => onChange(selection.getDateRange())} size='small'>
                            {selection.title}
                        </Button>
                    </Grid>))}
            </Grid>
        </Paper>
    );
};

DateRangeSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    startDate: PropTypes.instanceOf(moment),
    endDate: PropTypes.instanceOf(moment)
};

export default withStyles(styles, {withTheme: true})(DateRangeSelector);

export const defaultDateRange = quickSelections.find(selection => selection.default).getDateRange();