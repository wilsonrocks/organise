import React from 'react';
import MemberTask from './MemberTask';

function MemberTaskList ({tasks}) {


  return (
  <div class="columns is-multiline">

  {
    tasks
    .map((task) => {
      const {id} = task;

      return (
        <div className="column is-one-half">
          <MemberTask
            {...task}
            key={id}
            doneCallback={() => this.completeTask(id)}
          />
        </div>
      );
    })
    }
  </div>
);
}

export default MemberTaskList;