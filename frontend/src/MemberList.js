import React from 'react';

function MemberList ({members, heading}) {
  return (
    members.length > 0
      ?(
        <div>
          <p className="is-size-7">{heading}: {members.map(member => member.name).join(', ')}</p>
        </div>
        )
      : null
  );
}

export default MemberList;
