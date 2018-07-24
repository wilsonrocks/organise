import React from 'react';
import {Link} from 'react-router-dom';


function CampaignList ({campaigns}) {

  const adminCampaigns = campaigns.filter(campaign => campaign.membership === 'admin');
  const memberCampaigns = campaigns.filter(campaign => campaign.membership === 'member');

  return (
    <nav className="menu">
      <p className="menu-label">Member</p>
      <ul className="menu-list">
      {memberCampaigns.map(
        ({id, name}) => (
          <li key={id}><Link to={`/campaign/${id}`}>{name}</Link></li>
        )
      )}
      </ul>


      <p className="menu-label">Admin</p>
      <ul className="menu-list">
      {adminCampaigns.map(
        ({id, name}) => (
          <li key={id}><Link to={`/campaign/${id}`}>{name}</Link></li>
        )
      )}
      </ul>

    </nav>
  );
}

export default CampaignList;