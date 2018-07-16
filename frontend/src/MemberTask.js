import React from 'react';

function MemberTask ({instructions, dueDate, doneCallback}) {
  return (
  <div style={{border: 'solid 1px'}}>
    <p>{instructions}</p>
    <p>Due {dueDate} </p>
    <button onClick={doneCallback}>Done!</button>
  </div>
  );
}


export default MemberTask;
