import React from 'react';
import {Link} from 'react-router-dom';


function CampaignList ({campaigns}) {
  return (
    <nav>
      <ul>
      <h2>Campaigns</h2>
      {campaigns.map(
        ({id, name}) => (
          <li><Link key={id} to="#">{name}</Link></li>
        )
      )}
      </ul>
    </nav>
  );
}

export default CampaignList;