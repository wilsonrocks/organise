import React, { Component } from 'react';
import Login from './Login';
import {getActivistDetails} from './api';

class App extends Component {

  state = {
    loggedIn: false,
    loginError: false,
    activist: {},
    campaigns: [],
    email: '',
    password: '',
  }

  login = (email, password) => {

    getActivistDetails(email, password)
    .then(response => {

      if (response === null) {
        this.setState({
          loginError:true
        });
      }
      else {
        const {activist, campaigns} = response;

        this.setState({
          loggedIn: true,
          loginError: false,
          email,
          password,
          activist,
          campaigns,
        });
      }
    });
  }

  logout = () => {
    this.setState({
      loggedIn: false,
      activist: {},
      campaigns: [],
      email: '',
      password: '',
    });
  }

  render () {
    const {loggedIn, loginError} = this.state;
    return (
      <div className="App">
        {loggedIn ? <button onClick={this.logout}>Log Out</button> : <Login onSubmit={this.login}/>}
        {loginError ? <p>Problem with login!</p> : null}
      </div>
    );
  }
}

export default App;
