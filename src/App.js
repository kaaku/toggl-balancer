import moment from 'moment';
import React, {Component} from 'react';
import {withStyles} from "@material-ui/core/styles";

import ApiTokenDialog from "./ApiTokenDialog";
import CalendarGrid from "./CalendarGrid";

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
        return (
            <React.Fragment>
                <ApiTokenDialog open={!this.state.apiToken}
                                mandatory={!this.state.apiToken}
                                onClose={apiToken => this.setState({apiToken: apiToken})}/>
                {this.state.timeEntries.length > 0 &&
                <CalendarGrid startDate={moment('2018-10-01')}
                              endDate={moment()}
                              timeEntries={this.state.timeEntries}/>}
                {this.state.error && <div>{this.state.error}</div>}
            </React.Fragment>
        );
    }
}

export default withStyles({}, {withTheme: true})(App);
