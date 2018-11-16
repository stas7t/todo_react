import React from 'react';
import { connect } from 'react-redux';

import { taskActions } from '../actions';

class AddTaskForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ name: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { name } = this.state;
    const { projectId, dispatch } = this.props;

    if (name) {
      dispatch(taskActions.create(projectId, name));
    }
  }

  handleCancel(e) {
    e.preventDefault();

    this.setState({ name: '', submitted: false });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group mt-minus-1">
          <input type="text" className="form-control rounded-0" onChange={this.handleChange} placeholder="Enter Task Name ..." required />
        </div>
        { name.length > 0 &&
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Add task</button>
            <button className="btn btn-ligth" type="button" onClick={this.handleCancelEditing}>Cancel</button>
          </div>
        }
      </form>
    );
  }
}

function mapStateToProps(state) {
  const { projects } = state;
  return {
    projects
  };
}

const connectedAddTaskForm = connect(mapStateToProps)(AddTaskForm);
export { connectedAddTaskForm as AddTaskForm };
