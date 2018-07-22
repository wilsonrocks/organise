import React from 'react';
import moment from 'moment';

function MemberTask ({instructions, due_date, doneCallback}) {
  return (
  <div>
    <p>{instructions}</p>
    <p>Due {moment(due_date).fromNow()} </p>
    <button onClick={doneCallback}>Done!</button>
  </div>
  );
}


export default MemberTask;
