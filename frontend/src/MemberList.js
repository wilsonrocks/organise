import React from 'react';

function MemberList ({members, heading}) {
  return (
    members.length > 0
      ?(
        <div>
          <h4> {heading} </h4>
          <ul>
            {
              members.map(member => (
                <li key={member.id}>
                  {member.name}
                </li>
              ))
            }
          </ul>
        </div>
        )
      : null
  );
}

export default MemberList;
