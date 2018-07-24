import React from 'react';

import Membership from './Membership';
import NewTask from './NewTask';
import MemberTaskList from './MemberTaskList';
import AdminTaskList from './AdminTaskList';

import {
  getTasksForCampaign,
  completeTask,
  deleteTask,
} from './api';

class Campaign extends React.Component {

  state = {
    campaign: {},
    tasks: [],
    members: [],
  }

  incompleteTasks () {
    const {tasks} = this.state;
    return tasks.filter(task => !task.done)
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

  addTask = ({created}) => {
    const {members, tasks} = this.state;
    const number_assigned = members.length;
    this.setState({tasks:
      [
        ...tasks,
        {...created, number_assigned, number_completed:0}
      ]
    });
  }

  isAdmin = () => {
    return this.state.campaign.membership === 'admin';
  }

  render () {

    const {tasks, members, campaign:{name, logo, membership, id, description}} = this.state;
    const {email, password} = this.props;

    document.title = name;
    return (
      <div>

        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">
              <img src={logo} alt=""/>
            </figure>
          </div>
          <div className="media-content">
            <p className="title">{name}</p>
            <p className="subtitle">{description}</p>
          </div>

        </div>


        <Membership
          members={members}
        />

        {membership ==='member'
        ?
          <MemberTaskList
            id={id}
            email={email}
            password={password}
            membership={membership}
            tasks={this.incompleteTasks()}
            completeTask={this.completeTask}
         />
         : 
         <AdminTaskList
            id={id}
            email={email}
            password={password}
            membership={membership}
            tasks={tasks}
            completeTask={this.completeTask}
            deleteTask={this.deleteTask}
            createTask={this.createTask}
         />
    }

        {/* <NewTask
          campaignId={id}
          email={email}
          password={password}
          addTaskCallback={this.addTask}
          tasks={this.filteredTasks()}
        /> */}

      </div>
    );
  }
}

export default Campaign;