import React from 'react';
import {Link} from 'react-router-dom';


function CampaignList ({campaigns}) {

  const adminCampaigns = campaigns.filter(campaign => campaign.membership === 'admin');
  const memberCampaigns = campaigns.filter(campaign => campaign.membership === 'member');

  return (
    <nav>
      <ul>
      <h2>Campaigns</h2>
      <h3>Member</h3>

      {memberCampaigns.map(
        ({id, name}) => (
          <li key={id}><Link to="#">{name}</Link></li>
        )
      )}

      <h3>Admin</h3>
      {adminCampaigns.map(
        ({id, name}) => (
          <li key={id}><Link to="#">{name}</Link></li>
        )
      )}

      </ul>
    </nav>
  );
}

export default CampaignList;