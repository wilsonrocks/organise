import React from 'react';
import moment from 'moment';

class NewTask extends React.Component {

  state = {
    editing: false,
    instructions: '',
    due_date: moment().format('YYYY-MM-DD')
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
            onChange={({target:{value:instructions}}) => this.setState({instructions}) }
          >
          </textarea>

          <label htmlFor="due-date">Due Date</label>
          <input
            id="due-date"
            type="date"
            value={due_date}
            onChange={({target:{value: due_date}}) =>
              {
                this.setState({due_date});
              }
            }
            />

          <button type="button">Create Task</button>
          <button
            type="button"
            onClick={() => this.setState({editing:false})}>Cancel</button>

        </form>
      </div>
    );
  }
}

export default NewTask;
