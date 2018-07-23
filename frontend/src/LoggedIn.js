import React, { Component } from 'react';

import CampaignList from './CampaignList';

import {Route, Switch, Redirect} from 'react-router-dom';

import {getActivistDetails} from './api';
import TaskList from './TaskList';

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
          email,
          password,
          activist,
          campaigns,
        });
      }
    })
  }

  render () {
    const {activist, campaigns} = this.state;
    const {logout, email, password} = this.props;
    return (
        <div>

          <button onClick={logout}>Log Out</button>
          <p> Welcome {activist.name}!</p>
          
          {/* sidebar */}
          <CampaignList campaigns={campaigns}/>

          {/* main bit */}
          <Switch>
            <Route
              path="/campaign/:id"
              render={({match, history}) => {
                
                return(
                <TaskList
                  match={match}
                  email={email}
                  password={password}
                  history={history}
                  />);
                }
              }
            />
            <Route exact path="/" render={()=>null}/>
            <Redirect to="/"/>
          </Switch>


        </div>
    );
  }
}

export default LoggedIn;
