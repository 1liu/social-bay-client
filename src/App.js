import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import theme from './lib/theme';
import jwtDecode from 'jwt-decode';
//redux
import { Provider } from 'react-redux'
import store from './redux/store'
//components
import Navbar from './components/Navbar';
import AuthRoute from './lib/AuthRoute'
//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const token = localStorage.FBIdToken;
let authenticated;

if (token) {
  const decodeToken = jwtDecode(token);
  console.log(decodeToken)
  if (decodeToken.exp * 1000 < Date.now()) {
    console.log('Token is NOT valid')
    window.location.href = '/login';
    authenticated = false;
  }
  else {
    console.log('Token is valid')
    authenticated = true;

  }
}
console.log('Theme', theme)
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
