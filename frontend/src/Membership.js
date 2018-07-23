import React from 'react';
import MemberList from './MemberList';


function Membership ({members: membership}) {
  const members = membership.filter(member => member.membership === 'member');
  const admins = membership.filter(member => member.membership === 'admin');

  return (
    <div>
      <MemberList
        members={members}
        heading="Members"
      />

      <MemberList
        members={admins}
        heading="Admins"
      />
      

    </div>


  );

}

export default Membership;