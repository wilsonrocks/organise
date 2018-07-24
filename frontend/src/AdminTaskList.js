import React from 'react';
import AdminTask from './AdminTask';

function MemberTaskList ({tasks, deleteTask, completeTask}) {


  return (
    <div>
      <p className="title is-size-5"> Manage Tasks</p>
      <div className="columns is-multiline">

      {
        tasks
        .map((task) => {
          const {id} = task;

          return (
            <div className="column is-one-half">
              <AdminTask
                {...task}
                key={id}
                doneCallback={() => completeTask(id)}
                deleteCallback={()=> deleteTask(id)}
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