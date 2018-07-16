import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Login from './Login';
import {authenticate} from './api';
import LoggedIn from './LoggedIn';

class App extends Component {

  state = {
    loggedIn: false,
    loginError: false,
    email: '',
    password: '',
  }

  login = (email, password) => {
    authenticate(email, password)
    .then(authenticated => {
      if (authenticated) {
        this.setState({
          loggedIn: true,
          loginError: false,
          email,
          password,
        });
      }
      else {
        this.setState({
          loggedIn: false,
          loginError: true,
        })
      }
    })
  }

  logout = () => {
    localStorage.email = '';
    localStorage.password = '';

    this.setState({
      loggedIn: false,
      email: '',
      password: '',
    });
  }

  componentDidMount () {
    const {email, password} = localStorage;
    if (email || password) this.login(email, password);
  }

  render () {
    const {loggedIn, loginError, email, password} = this.state;
    return (
      <BrowserRouter>
        <div className="App">

        {loggedIn
          ? <LoggedIn
          logout={this.logout}
          email={email}
          password={password}
          />
          : <Login
            error={loginError}
            onSubmit={this.login}
          />}

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
