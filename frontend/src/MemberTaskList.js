import React from 'react';
import MemberTask from './MemberTask';

function MemberTaskList ({tasks, completeTask}) {


  return (
    <div>
      <p className="title is-size-5"> Incomplete Tasks</p>
      <div className="columns is-multiline">

      {
        tasks
        .map((task) => {
          const {id} = task;
          return (
            <div key={id} className="column is-one-half">
              <MemberTask
                {...task}
                doneCallback={() => completeTask(id)}
              />
            </div>
          );
        })
        }
      </div>
    </div>
);
}

export default MemberTaskList;