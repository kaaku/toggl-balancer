import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/en-gb';
import React from 'react';
import ReactDOM from 'react-dom';
import { StyledEngineProvider } from '@mui/material';
import * as serviceWorker from './serviceWorker';

import App from './App';

moment.locale('en-gb');

const theme = createTheme();

const root = () => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </StyledEngineProvider>
);

ReactDOM.render(root(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
