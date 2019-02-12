import './bootstrap';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import moment from 'moment';
import 'moment/locale/en-gb';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import * as serviceWorker from './serviceWorker';

import App from './App';

moment.locale('en-gb');

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const root = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <App />
    </MuiPickersUtilsProvider>
  </ThemeProvider>
);

ReactDOM.render(root(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
