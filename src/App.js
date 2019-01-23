import CssBaseline from '@material-ui/core/CssBaseline';
import moment from 'moment';
import React, {Component} from 'react';

import ApiTokenDialog from "./ApiTokenDialog";
import DateEntry from "./DateEntry";
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoaded: false, apiToken: '', timeEntries: []};
    }

    updateTimeEntries() {
        fetch('https://www.toggl.com/api/v8/time_entries?start_date=2019-01-01T00%3A00%3A00%2B00%3A00', {
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
                {
                    Object.entries(entriesByDate)
                        .map(entry =>
                            <DateEntry key={entry[0]} date={entry[0]} timeEntries={entry[1]}/>)
                }
                {this.state.error && <div>{this.state.error}</div>}
            </div>
        );
    }
}

export default App;
