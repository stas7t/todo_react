import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { projectActions } from '../actions';

class HomePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(projectActions.getAll());
  }

  handleDeleteProject(id) {
    return () => this.props.dispatch(projectActions.delete(id));
  }

  render() {
    const { projects } = this.props;
    return (
      <div>
        <h4>Projects</h4>
        { projects.loading &&
          <div className="text-center pt-5">
            <span><i className="fa fa-refresh fa-spin fa-3x fa-fw" /></span>
          </div>
        }
        {projects.items &&
          <div>
            {projects.items.map((project) =>
              // <li key={project.id}>
              //   {project.name}
              //   {
              //     project.deleting ? <em> - Deleting...</em>
              //       : project.deleteError ? <span className="text-danger"> - ERROR: {project.deleteError}</span>
              //         : <span> - <a onClick={this.handleDeleteProject(project.id)}>Delete</a></span>
              //   }
              // </li>
              <div key={project.id}>
                <section className="mb-2">
                  <div className="container ">
                    <div className="row project">
                      <div className="col py-2">
                        <a data-toggle="collapse" href={`#collapseTasks-${project.id}`} aria-expanded="true" aria-controls={`#collapseTasks-${project.id}`} className="nodecor">
                          <i className="fa fa-caret-right fa-lg" aria-hidden="true" />
                          <span className="pl-2 text-secondary font-weight-bold">{project.name}</span>
                        </a>
                      </div>
                      <div className="p-2 project-actions">
                        <a ><i className="fa fa-pencil fa-lg" aria-hidden="true" /></a>
                        <a data-toggle="modal" data-target={`#confirmDeletionModal-${project.id}`}><i className="fa fa-trash-o fa-lg" aria-hidden="true" /></a>
                      </div>
                    </div>
                  </div>
                  <div id={`collapseTasks-${project.id}`} className="">
                    <ul>
                      <li>AAA</li>
                      <li>BBB</li>
                    </ul>
                  </div>
                  {/* <div ng-if="projectDetail.errors" className="alert alert-danger" role="alert">
                    {'{'}{'{'} projectDetail.errors.message {'}'}{'}'}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div> */}
                  <form ng-switch-when="true">
                    <div className="form-group">
                      <input type="text" className="form-control rounded-0" autoFocus required />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary" type="submit">Save</button>
                      <button className="btn btn-light" type="button">Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            )}
          </div>
        }
        {/* <div ng-if="projects.errors" className="alert alert-danger" role="alert">
          {'{'}{'{'} projects.errors.message {'}'}{'}'}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div> */}
        <form>
          <div className="form-group">
            <input type="text" className="form-control rounded-0" placeholder="Enter Project Name ..." required />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">Create Project</button>
            <button className="btn btn-ligth" type="button">Cancel</button>
          </div>
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
