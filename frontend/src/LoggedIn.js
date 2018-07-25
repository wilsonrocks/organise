import React, { Component } from 'react';

import CampaignList from './CampaignList';

import {Route, Switch, Redirect} from 'react-router-dom';

import {getActivistDetails} from './api';
import Campaign from './Campaign';

import NavBar from './NavBar';


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
          <NavBar
            name={activist.name}
            logout={logout}
          />

        <section className="section">
          <div className="columns">
            
            <div className="column is-narrow" style={{width:'150px'}}>
              <CampaignList campaigns={campaigns}/>
            </div>

            <div className="column">
              <Switch>
                <Route
                  path="/campaign/:id"
                  render={({match, history}) => {

                    return(
                    <Campaign
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
          </div>
        </section>
      </div>
    );
  }
}

export default LoggedIn;
