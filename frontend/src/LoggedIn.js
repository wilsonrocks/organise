import React, { Component } from 'react';

import CampaignList from './CampaignList';
import MemberTask from './MemberTask';

import {getActivistDetails} from './api';

class LoggedIn extends Component {

  state = {
    activist: {},
    campaigns: [],
  }

  componentDidMount () {
    const {email, password, logout} = this.props;
    getActivistDetails(email, password)
    .then(response => {

      if (response === null) {
        logout();
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

  render () {
    const {activist, campaigns} = this.state;
    const {logout} = this.props;
    return (
        <div>

          <button onClick={logout}>Log Out</button>
          <p> Welcome {activist.name}!</p>
          <CampaignList campaigns={campaigns}/>

          <MemberTask
            instructions='fight the power'
            dueDate='2019-12-25'
            doneCallback={e=>console.log('called')}
          />

        </div>
    );
  }
}

export default LoggedIn;
