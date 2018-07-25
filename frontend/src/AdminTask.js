import React from 'react';
import moment from 'moment';

import Doughnut from './Doughnut';

function AdminTask
({instructions, due_date, number_assigned, number_completed, done,
  doneCallback, deleteCallback}) {
  return (
    <div className="box task">
      <div className="media">
        <div className="media-left">

          <Doughnut
            {...{number_assigned, number_completed}}
          />
            <button
              className="button"
              onClick={doneCallback}
              disabled={done}
            >
              Done!
            </button>

            <button
              className="button is-block"
              onClick={deleteCallback}
            >
              Delete
            </button>
        </div>

        <div className="media-content task-text" >

          <p>{instructions}</p>
          <p className="has-text-right">Due {moment(due_date).fromNow()} </p>

        </div>
      </div>
    </div>
  );
}


export default AdminTask;
