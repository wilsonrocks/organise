import React from 'react';
import moment from 'moment';

function MemberTask ({instructions, dueDate, doneCallback}) {
  return (
  <div style={{border: 'solid 1px'}}>
    <p>{instructions}</p>
    <p>Due {moment(due_date).fromNow()} </p>
    <button onClick={doneCallback}>Done!</button>
  </div>
  );
}


export default MemberTask;
