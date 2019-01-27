import {DatePicker} from 'material-ui-pickers';
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import PropTypes from 'prop-types';
import React from 'react';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 4
    }
});

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
        </Paper>
    );
};

DateRangeSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    startDate: PropTypes.instanceOf(moment),
    endDate: PropTypes.instanceOf(moment)
};

export default withStyles(styles, {withTheme: true})(DateRangeSelector);