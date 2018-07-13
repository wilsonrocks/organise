import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Login from './Login';
import {getActivistDetails} from './api';
import CampaignList from './CampaignList';

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
        localStorage.email = email;
        localStorage.password = password;

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

    localStorage.email = '';
    localStorage.password = '';

    this.setState({
      loggedIn: false,
      activist: {},
      campaigns: [],
      email: '',
      password: '',
    });
  }

  componentDidMount () {
    const {email, password} = localStorage;
    if (email || password) this.login(email, password);
  }

  render () {
    const {loggedIn, loginError, activist, campaigns} = this.state;
    return (
      <BrowserRouter>
        <div className="App">

        {/* login bit */}
        {loggedIn ? <button onClick={this.logout}>Log Out</button> : <Login onSubmit={this.login} error={loginError}/>}

        {/* welcome */}
        {loggedIn ? <p> Welcome {activist.name}!</p>:null}

        {/* list of campaigns */}

        {loggedIn ? <CampaignList campaigns={campaigns}/>:null}

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
