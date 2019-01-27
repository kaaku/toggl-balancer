import Grid from "@material-ui/core/Grid";
import moment from 'moment';
import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";

import ApiTokenDialog from "./ApiTokenDialog";
import CalendarGrid from "./CalendarGrid";
import DateRangeSelector from "./DateRangeSelector";
import {TimeEntryStore} from "./TimeEntryStore";

const styles = theme => ({
    dateSelectorContainer: {
        marginTop: theme.spacing.unit * 5
    }
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apiToken: '',
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month').startOf('day'),
            timeEntries: []
        };
    }

    updateTimeEntries() {
        const {startDate, endDate, apiToken} = this.state;
        TimeEntryStore.fetchTimeEntries(startDate, endDate, apiToken)
            .then(result => this.setState({timeEntries: result}),
                error => this.setState({error: error.toString()}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {startDate, endDate, apiToken} = this.state;
        if (prevState.startDate !== startDate || prevState.endDate !== endDate || prevState.apiToken !== apiToken) {
            this.updateTimeEntries();
        }
    }

    render() {
        const {startDate, endDate, apiToken, timeEntries} = this.state;
        const {classes} = this.props;

        if (!apiToken) {
            return (<ApiTokenDialog open={!apiToken}
                                    mandatory={!apiToken}
                                    onClose={apiToken => this.setState({apiToken})}/>
            );
        }

        return (
            <React.Fragment>
                <Grid container justify='center' className={classes.dateSelectorContainer}>
                    <Grid item>
                        <DateRangeSelector startDate={startDate}
                                           endDate={endDate}
                                           onChange={({startDate, endDate}) => this.setState({startDate, endDate})}/>
                    </Grid>
                </Grid>
                {timeEntries.length > 0 &&
                <CalendarGrid startDate={startDate} endDate={endDate} timeEntries={timeEntries}/>}
                {this.state.error && <div>{this.state.error}</div>}
            </React.Fragment>
        );
    }
}

export default withStyles(styles, {withTheme: true})(App);
