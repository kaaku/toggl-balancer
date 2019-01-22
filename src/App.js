import React, {Component} from 'react';
import moment from 'moment';
import './App.css';
import ApiTokenForm from "./ApiTokenForm";
import DateEntry from "./DateEntry";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {isLoaded: false, timeEntries: []};
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
        const entriesByDate = this.state.timeEntries.reduce((result, entry) => {
            const date = moment(entry.start).format('YYYY-MM-DD');
            (result[date] = result[date] || []).push(entry);
            return result;
        }, {});

        return (
            <div>
                <ApiTokenForm onSubmit={(apiToken) => this.setState({apiToken: apiToken})}/>
                {
                    Object.entries(entriesByDate)
                        .sort((a, b) => a[0].localeCompare(b[0]))
                        .map((entry) => <DateEntry key={entry[0]} date={entry[0]} timeEntries={entry[1]}/>)
                }
                {this.state.error && <div>{this.state.error}</div>}
            </div>
        );
    }
}

export default App;
