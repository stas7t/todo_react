import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { projectActions } from '../actions';
import { ProjectContainer } from '../containers';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(projectActions.getAll());
  }

  handleDeleteProject(id) {
    return () => this.props.dispatch(projectActions.delete(id));
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ name: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { name } = this.state;
    const { dispatch } = this.props;
    if (name) {
      dispatch(projectActions.create(name));
    }
  }

  handleCancel(e) {
    e.preventDefault();

    this.setState({ name: '', submitted: false });
  }

  render() {
    const { projects } = this.props;
    const { name } = this.state;

    return (
      <div>
        <h4>Projects</h4>
        { projects.loading &&
          <div className="text-center pt-5">
            <span><i className="fa fa-refresh fa-spin fa-3x fa-fw" /></span>
          </div>
        }
        { projects.items &&
          <div>
            { projects.items.map((project) =>
              // <li key={project.id}>
              //   {project.name}
              //   {
              //     project.deleting ? <em> - Deleting...</em>
              //       : project.deleteError ? <span className="text-danger"> - ERROR: {project.deleteError}</span>
              //         : <span> - <a onClick={this.handleDeleteProject(project.id)}>Delete</a></span>
              //   }
              // </li>
              <ProjectContainer key={project.id} {...project} />
            )}
          </div>
        }
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control rounded-0" onChange={this.handleChange} placeholder="Enter Project Name ..." required />
          </div>
          { name.length > 0 &&
            <div className="form-group">
              <button className="btn btn-primary" type="submit">Create Project</button>
              <button className="btn btn-ligth" type="button" onClick={this.handleCancelEditing}>Cancel</button>
            </div>
          }
        </form>
      </div>

    // <div className="col-md-6 col-md-offset-3">
    //   <h3>All projects:</h3>
    //   {projects.loading && <em>Loading projects...</em>}
    //   {projects.error && <span className="text-danger">ERROR: {projects.error}</span>}
    //   {projects.items &&
    //     <ul>
    //       {projects.items.map((project) =>
    //         <li key={project.id}>
    //           {project.name}
    //           {
    //             project.deleting ? <em> - Deleting...</em>
    //               : project.deleteError ? <span className="text-danger"> - ERROR: {project.deleteError}</span>
    //                 : <span> - <a onClick={this.handleDeleteProject(project.id)}>Delete</a></span>
    //           }
    //         </li>
    //       )}
    //     </ul>
    //   }
    //   <p>
    //     <Link to="/login">Logout</Link>
    //   </p>
    // </div>
    );
  }
}

function mapStateToProps(state) {
  const { projects } = state;
  return {
    projects
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
