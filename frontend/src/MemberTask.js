import React from 'react';
import moment from 'moment';

function MemberTask ({instructions, due_date, doneCallback, deleteCallback}) {
  return (
  <div style={{border: 'solid 1px'}}>
    <p>{instructions}</p>
    <p>Due {moment(due_date).fromNow()} </p>
    <button onClick={doneCallback}>Done!</button>
    {deleteCallback ? <button onClick={deleteCallback}>Delete</button> : null}
  </div>
  );
}


export default MemberTask;
