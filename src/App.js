import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { ThemeProvider } from '@material-ui/core';
import theme from './lib/theme';
import jwtDecode from 'jwt-decode';
//redux
import { Provider } from 'react-redux'
import store from './redux/store'
import { logoutUser, getUserData } from './redux/actions/userActions'
//components
import Navbar from './components/Navbar';
import AuthRoute from './lib/AuthRoute'
//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import user from './pages/user'
import axios from 'axios';

axios.defaults.baseURL = 'https://us-central1-social-bay-5841e.cloudfunctions.net/api';

const token = localStorage.FBIdToken;

if (token) {
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    // authenticated = false;
    store.dispatch(logoutUser())
  }
  else {
    // authenticated = true;
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/users/:handle" component={user} />
              <Route exact path="/users/:handle/post/:postId" component={user} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
