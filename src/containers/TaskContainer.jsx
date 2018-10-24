import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { projectActions } from '../actions';

class ProjectContainer extends React.Component {
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
    dispatch(projectActions.delete(id));
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
      dispatch(projectActions.update(id, name));
    }
  }

  handleStartEditing(e) {
    e.preventDefault();

    const { dispatch, id } = this.props;
    dispatch(projectActions.startEditing(id))
  }

  handleCancelEditing(e) {
    e.preventDefault();

    this.setState({ name: '' });
    const { dispatch, id } = this.props;
    dispatch(projectActions.cancelEditing(id))
  }

  render() {
    const { id, name, tasks, editing } = this.props;

    return (
      <section className="mb-2">
        { !editing &&
          <div className="container ">
            <div className="row project project-show-tasks">
              <div className="col py-2">
                <a data-toggle="collapse" href={`#collapseTasks-${id}`} aria-expanded="true" aria-controls={`#collapseTasks-${id}`} className="nodecor">
                  <i className="fa fa-caret-right fa-lg" aria-hidden="true" />
                  <span className="pl-2 text-secondary font-weight-bold">{name}</span>
                </a>
              </div>
              <div className="p-2 project-actions">
                <a onClick={this.handleStartEditing} ><i className="fa fa-pencil fa-lg" aria-hidden="true" /></a>
                <a onClick={this.handleDeleteProject} ><i className="fa fa-trash-o fa-lg" aria-hidden="true" /></a>
                {/* <a data-toggle="modal" data-target={`#confirmDeletionModal-${id}`}><i className="fa fa-trash-o fa-lg" aria-hidden="true" /></a> */}
              </div>
            </div>

            { tasks &&
              <div id={`collapseTasks-${id}`} className="">
                <ul>
                  { tasks.map((task) =>
                    <li key={task.id}>{task.name}</li>
                  )}
                </ul>
              </div>
            }
          </div>
        }
        {/* Edit Form */}
        { editing &&
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className="form-control rounded-0" onChange={this.handleChange} defaultValue={name} autoFocus required />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">Save</button>
              <button className="btn btn-light" type="button" onClick={this.handleCancelEditing}>Cancel</button>
            </div>
          </form>
        }

        {/* Modal */}
        <div className="modal" id={`#confirmDeletionModal-${id}`} tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm deletion</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this item?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={this.handleDeleteProject} data-dismiss="modal">Delete</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }
}

function mapStateToProps(state) {
  const { projects } = state;
  return {
    projects
  };
}

const connectedProjectContainer = connect(mapStateToProps)(ProjectContainer);
export { connectedProjectContainer as ProjectContainer };
