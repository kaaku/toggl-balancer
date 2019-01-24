import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';
import React, {Component} from 'react';

import ApiTokenDialog from "./ApiTokenDialog";
import {CalendarGrid} from "./CalendarGrid";
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoaded: false, apiToken: '', timeEntries: []};
    }

    updateTimeEntries() {
        fetch('https://www.toggl.com/api/v8/time_entries?start_date=2018-10-01T00%3A00%3A00%2B00%3A00', {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Basic ' + btoa(`${this.state.apiToken}:api_token`),
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(result => this.setState({isLoaded: true, timeEntries: result}),
                error => this.setState({isLoaded: true, error: error.toString()}));
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.apiToken !== this.state.apiToken) {
            this.updateTimeEntries();
        }
    }

    render() {
        const entriesByDate = this.state.timeEntries
            .sort((a, b) => a.start.localeCompare(b.start))
            .reduce((result, entry) => {
                const date = moment(entry.start).format('YYYY-MM-DD');
                (result[date] = result[date] || []).push(entry);
                return result;
            }, {});

        return (
            <div>
                <CssBaseline/>
                <ApiTokenDialog open={!this.state.apiToken}
                                mandatory={!this.state.apiToken}
                                onClose={apiToken => this.setState({apiToken: apiToken})}/>
                {this.state.timeEntries.length > 0 &&
                <Grid container spacing={40}>
                    <Grid item xs={12} lg={6}>
                        <CalendarGrid year={2018} month={10} data={entriesByDate}/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <CalendarGrid year={2018} month={11} data={entriesByDate}/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <CalendarGrid year={2018} month={12} data={entriesByDate}/>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <CalendarGrid year={2019} month={1} data={entriesByDate}/>
                    </Grid>
                </Grid>}
                {this.state.error && <div>{this.state.error}</div>}
            </div>
        );
    }
}

export default App;
