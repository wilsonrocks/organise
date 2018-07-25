import React from 'react';
import moment from 'moment';

function MemberTask ({instructions, due_date, doneCallback}) {
  return (
    <div className="box task">
      <div className="media">
    
      <div className="media-left">
        <button className="button" onClick={doneCallback}>Done!</button>
        <p >Due {moment(due_date).fromNow()} </p>
      </div>
      
      <div className="media-content task-text">
        <p>{instructions}</p>
      </div>

    </div>
  </div>
  );
}


export default MemberTask;
