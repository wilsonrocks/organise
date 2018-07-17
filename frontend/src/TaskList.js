import React from 'react';

import MemberTask from './MemberTask';

import {
  getTasksForCampaign,
  completeTask,
} from './api';

class TaskList extends React.Component {

  state = {
    campaign: {},
    tasks: [],
  }

  componentDidMount () {
    const {email, password} = this.props;
    const {id} = this.props.match.params;

    getTasksForCampaign(email, password, id)
    .then(response => this.setState(response));
  }

  componentDidUpdate (prevProps) {
    const {email, password} = this.props;
    const {id: oldId} = prevProps.match.params;
    const {id} = this.props.match.params;
    if (id !== oldId) {
      getTasksForCampaign(email, password, id)
      .then(response=> this.setState(response));
    }
  }

  completeTask = (taskId) => {
    const {email, password} = this.props;
    completeTask(email, password, taskId)
    .then(() => {
      const {tasks: oldTasks} = this.state;
      const tasks = oldTasks.filter(
        task => task.id !== taskId
      );
      this.setState({tasks});
    });
  }

  deleteTask = (taskId) => {
    console.log(`try to delete ${taskId}`);
  }

  render () {

    const {tasks, campaign:{name, logo}} = this.state;
    document.title = name;

      return (
    <div>
      <h2>{name}</h2>
      <img src={logo} alt=""/>
      <h3>Outstanding Tasks</h3>
      {
        tasks.map(({id, instructions, due_date}) => <MemberTask
          key={id}
          instructions={instructions}
          due_date={due_date}
          doneCallback={() => this.completeTask(id)}
        />)
      }

    </div>
    );
  }
}

export default TaskList;