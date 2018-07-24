import React from 'react';
import AdminTask from './AdminTask';
import NewTask from './NewTask';

function AdminTaskList ({tasks, deleteTask, completeTask, createTask, email, password, id}) {


  return (
    <div>
      <p className="title is-size-5"> Manage Tasks</p>

      <NewTask
        campaignId={id}
        email={email}
        password={password}
        addTaskCallback={createTask}
        tasks={tasks}
      />

      <div className="columns is-multiline">

      {
        tasks
        .map((task) => {
          const {id} = task;

          return (
            <div key={id} className="column is-one-half">
              <AdminTask
                {...task}
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

export default AdminTaskList;