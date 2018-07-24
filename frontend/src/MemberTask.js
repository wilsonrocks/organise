import React from 'react';
import moment from 'moment';

function MemberTask ({instructions, due_date, doneCallback}) {
  return (
  <div className="media task">
    
    <div className="media-left">
      <button className="button" onClick={doneCallback}>Done!</button>
    </div>
    
    <div className="media-content">
      <p>{instructions}</p>
      <p className="has-text-right">Due {moment(due_date).fromNow()} </p>
    </div>

  </div>
  );
}


export default MemberTask;
