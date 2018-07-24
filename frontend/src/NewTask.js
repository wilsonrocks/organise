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
      <div className="field">
        <button
          type="button"
          className="button"
          onClick={()=>this.setState({editing:true})}
        >
          New Task
        </button>
      </div>
    );

    return (
      <div>
        <form>
          <div className="field is-horizontal">
            <label className="field-label">
              Instructions
            </label>
            <div className="field-body">
              <textarea
                className="textarea"
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
              />
            </div>
          </div>

          <div className="field is-horizontal">
            <label className="field-label">
                Due Date
            </label>
            <div className="field-body">
              <input
                className="input"
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
            </div>
          </div>

          <div className="field is-horizontal">
          <div className="field-label"/>
          <div className="field-body">
          <div className="buttons">
            <button
              type="button"
              className="button"
              disabled={this.notReadyToSubmit()}
              onClick={this.onSubmit}
            >
              Create Task
            </button>

            <button
              type="button"
              className="button"
                
              onClick={() => this.setState({editing:false})}
            >
              Cancel
            </button>
          </div>
          </div>
          </div>
        </form>
      </div>
    );
  }
}

export default NewTask;
