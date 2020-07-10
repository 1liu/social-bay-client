import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createMuiTheme'
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

//components
import Navbar from './components/Navbar';
//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F51B5',
      light: '#5EA7DB'
    },
    secondary: red
  },
  status: {
    danger: 'red'
  },
  background: {
    darkgrey: grey[300],
    lightgrey: grey[100]
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">

            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
