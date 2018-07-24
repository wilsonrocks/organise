import React from 'react';
import {Link, withRouter, matchPath} from 'react-router-dom';

function CampaignList ({campaigns, location}) {
  
  const {pathname:url} = location;
  
  
  const match = matchPath(url, '/campaign/:id')
  
  const campaignID = match ? match.params.id : null;

  const adminCampaigns = campaigns.filter(campaign => campaign.membership === 'admin');
  const memberCampaigns = campaigns.filter(campaign => campaign.membership === 'member');

  return (
    <nav className="menu">
      <p className="menu-label">Member of</p>
      <ul className="menu-list">
      {memberCampaigns.map(
        ({id, name}) => (
          <li key={id}>
            <Link
              to={`/campaign/${id}`}
              className={id === Number(campaignID) ? 'has-text-weight-bold': null}
              >{name}</Link>
          </li>
        )
      )}
      </ul>


      <p className="menu-label">Admin for</p>
      <ul className="menu-list">
      {adminCampaigns.map(
        ({id, name}) => (
          <li key={id}>
            <Link
              to={`/campaign/${id}`}
              className={id === Number(campaignID) ? 'has-text-weight-bold': null}
            >
              {name}
            </Link>
          </li>
        )
      )}
      </ul>

    </nav>
  );
}

export default withRouter(CampaignList);