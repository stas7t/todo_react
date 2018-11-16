import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { taskActions } from '../actions';

class TaskContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStartEditing = this.handleStartEditing.bind(this);
    this.handleCancelEditing = this.handleCancelEditing.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
  }

  handleDeleteProject(e) {
    e.preventDefault();

    const { dispatch, id } = this.props;
    dispatch(taskActions.delete(id));
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ name: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { name } = this.state;
    const { dispatch, id } = this.props;
    if (name) {
      dispatch(taskActions.update(id, name));
    }
  }

  handleStartEditing(e) {
    e.preventDefault();

    const { dispatch, id } = this.props;
    dispatch(taskActions.startEditing(id))
  }

  handleCancelEditing(e) {
    e.preventDefault();

    this.setState({ name: '' });
    const { dispatch, id } = this.props;
    dispatch(taskActions.cancelEditing(id))
  }

  render() {
    const { id, name, deadline, editing } = this.props;

    return (
      <section key={id}>
        <div className="row task mx-0">
          <div className="px-2 py-1 task-actions">
            {/* <div>
              <a><i className="fa fa-long-arrow-up" aria-hidden="true" /></a>
            </div>
            <div>
              <a><i className="fa fa-long-arrow-down" aria-hidden="true" /></a>
            </div> */}
          </div>
          <div className="px-1 py-2">
            <input type="checkbox"/>
          </div>
          <div className="col px-1 py-2">
            <div>
              <span>{name}</span>
            </div>
            <div className="deadline text-smaller">
              {deadline}
            </div>
          </div>
          <div className="p-2 task-actions">
            {/* <span>{99}</span>
            <a><i className="fa fa-comment fa-lg" aria-hidden="true" /></a>
            <a><i className="fa fa-clock-o fa-lg" aria-hidden="true" /></a> */}
            <a><i className="fa fa-pencil  fa-lg" aria-hidden="true" /></a>
            <a><i className="fa fa-trash-o fa-lg" aria-hidden="true" /></a>
          </div>
        </div>
        {/* Edit task Form */}
        { false &&
          <form name="editTask">
            <div className="form-group mt-minus-1">
              <input type="text" className="form-control rounded-0" autoFocus required />
            </div>
            <div className="form-group">
              <button className="btn btn-success" type="submit">Save</button>
              <button className="btn btn-light" type="button">Cancel</button>
            </div>
          </form>
        }
      </section>
    );
  }
}

function mapStateToProps(state) {
  const { task } = state;
  return {
    task
  };
}

const connectedTaskContainer = connect(mapStateToProps)(TaskContainer);
export { connectedTaskContainer as TaskContainer };
