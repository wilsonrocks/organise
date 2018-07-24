import React from 'react';
import moment from 'moment';

import {createTask} from './api';

class NewTask extends React.Component {

  state = {
    editing: false,
    instructions: '',
    due_date: moment().format('YYYY-MM-DD'),
  }

  notReadyToSubmit = () => {
    const {instructions, due_date} = this.state;
    const today = moment();
    return (instructions.length === 0) || today.isAfter(due_date, 'date');
  }

  onSubmit = () => {
    const {campaignId, email, password, addTaskCallback} = this.props;
    const {instructions, due_date} = this.state;
    createTask(email, password, campaignId, instructions, due_date)
    .then(created => {
      addTaskCallback(created)
      this.setState({
        editing: false,
        instructions: '',
        due_date: moment().format('YYYY-MM-DD'),
      })
    });

  }

  render ()  {
    const {editing, instructions, due_date} = this.state;

    if (editing === false) return (
      <div>
      <button
        type="button"
        onClick={()=>this.setState({editing:true})}
      >
        New Task
      </button>
      </div>
    );

    return (
      <div>
        <form>
          <label htmlFor="instructions">Instructions</label>

          <textarea
            id="instructions"
            value={instructions}
            onChange={
              ({target:{value:instructions}}) => {
                this.setState(
                  {
                    instructions,
                    notReadyToSubmit: this.notReadyToSubmit(),
                  }
                );
              }
            }
          >
          </textarea>

          <label htmlFor="due-date">Due Date</label>
          <input
            id="due-date"
            type="date"
            value={due_date}
            onChange={({target:{value: due_date}}) =>
              {
                this.setState({
                  due_date,
                });
              }
            }
            />

          <button
            type="button"
            disabled={this.notReadyToSubmit()}
            onClick={this.onSubmit}
          >Create Task</button>
          <button
            type="button"
            onClick={() => this.setState({editing:false})}>Cancel</button>

        </form>
      </div>
    );
  }
}

export default NewTask;
