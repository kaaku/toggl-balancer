import {DatePicker} from 'material-ui-pickers';
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
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
    },
    quickSelection: {
        '&:hover': {
            color: theme.palette.primary.light
        }
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
            endDate: moment().endOf('year').startOf('day')
        })
    }
];

const DateRangeSelector = (props) => {
    const {startDate, endDate, onChange, classes} = props;

    return (
        <Paper className={classes.root}>
            <Grid container justify='space-evenly' spacing={40}>
                <Grid item>
                    <DatePicker value={startDate} label='From' autoOk disableFuture clearable
                                onChange={date => onChange({startDate: date, endDate})}/>
                </Grid>
                <Grid item>
                    <DatePicker value={endDate} label='To' autoOk clearable
                                onChange={date => onChange({startDate, endDate: date})}/>
                </Grid>
            </Grid>
            <Grid container justify='space-evenly' spacing={40} className={classes.quickSelections}>
                {quickSelections.map(selection =>
                    (<Grid item key={selection.title}>
                        <Link onClick={() => onChange(selection.getDateRange())}
                              component='button'
                              underline='none'
                              color='inherit'
                              variant='body1'
                              className={classes.quickSelection}>
                            {selection.title}
                        </Link>
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