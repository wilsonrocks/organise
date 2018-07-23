import React from 'react';

import MemberTask from './MemberTask';
import AdminTask from './AdminTask';
import Membership from './Membership';

import {
  getTasksForCampaign,
  completeTask,
  deleteTask,
} from './api';

class TaskList extends React.Component {

  state = {
    campaign: {},
    tasks: [],
    members: [],
  }

  componentDidMount () {
    const {email, password, history} = this.props;
    const {id} = this.props.match.params;

    getTasksForCampaign(email, password, id)
    .then(response => this.setState(response))
    .catch(() => history.push('/'));
  }

  componentDidUpdate (prevProps) {
    const {email, password} = this.props;
    const {id: oldId} = prevProps.match.params;
    const {id} = this.props.match.params;
    if (id !== oldId) {
      getTasksForCampaign(email, password, id)
      .then(response=> this.setState(response))
    .catch(e => console.error(e));

    }
  }

  completeTask = (taskId) => {
    const {email, password} = this.props;
    completeTask(email, password, taskId)
    .then(() => {

      const {tasks: oldTasks} = this.state;

      if (!this.isAdmin()) {
        const tasks = oldTasks.filter(
          task => task.id !== taskId
        );
        this.setState({tasks});
      }

      else {
        const tasks = oldTasks.map(
          task => task.id === taskId
          ? { ...task,
              done: true,
              number_completed: task.number_completed + 1
            }
          : task
        );
        this.setState({tasks});
      }

    });
  }

  deleteTask = (taskId) => {
    const {email, password} = this.props;
    deleteTask(email, password, taskId)
    .then(({id}) => {
      const {tasks: oldTasks} = this.state;
      const tasks = oldTasks.filter(
        task => task.id !== taskId
      );
        
      this.setState({tasks});
    });
  }

  filteredTasks = () => {
    const {tasks} = this.state;

    if (this.isAdmin()) return tasks;

    else return tasks.filter(task => !task.done);
  }

  isAdmin = () => {
    return this.state.campaign.membership === 'admin';
  }

  render () {

    const {members, campaign:{name, logo, membership}} = this.state;
    document.title = name;
    return (
      <div>
        <h2>{name}</h2>
        <img src={logo} alt=""/>

        <Membership
          members={members}
        />

        <h3>{membership === 'admin' ? 'Manage Tasks' : 'Outstanding Tasks'}</h3>
        {
          this.filteredTasks()
          .map((task) => {
            const {id} = task;

            

            if (membership === 'member') return (

              <MemberTask
                {...task}
                key={id}
                doneCallback={() => this.completeTask(id)}
              />
            );

            else return (
              <AdminTask
                {...task}
                key={id}

                doneCallback={() => this.completeTask(id
                )}
                deleteCallback={() => this.deleteTask(id)}
              />
            );

          })
        }

      </div>
    );
  }
}

export default TaskList;