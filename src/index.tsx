// importing modules
import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

import './styles/index.css';
import Landing from './pages/landing/Landing';

import reportWebVitals from './reportWebVitals';

const themeDark = createTheme({
  palette: {
    background: {
      default: "#222222"
    },
    text: {
      primary: "#ffffff"
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={themeDark}>
      <CssBaseline/>
      <Landing />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
