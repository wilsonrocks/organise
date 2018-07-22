import React from 'react';
import moment from 'moment';

function AdminTask
({instructions, due_date, number_assigned, number_completed, done,
  doneCallback, deleteCallback}) {
  return (
  <div>
    <p>{instructions}</p>
    <p>Due {moment(due_date).fromNow()} </p>
    <button
      onClick={doneCallback}
      disabled={done}
    >Done!</button>
    <button onClick={deleteCallback}>Delete</button>
    <p> {number_completed}/{number_assigned}
    </p>


  </div>
  );
}


export default AdminTask;
