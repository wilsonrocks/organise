import React from 'react';
import moment from 'moment';

function MemberTask ({instructions, due_date, doneCallback}) {
  return (
  <div className="media task">
    
    <div className="media-left">
      <button className="button" onClick={doneCallback}>Done!</button>
      <p >Due {moment(due_date).fromNow()} </p>
    </div>
    
    <div className="media-content">
      <p>{instructions}</p>
    </div>

  </div>
  );
}


export default MemberTask;
