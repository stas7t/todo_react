import { projectConstants } from '../constants';
import { projectService } from '../services';

export const projectActions = {
  getAll,
  create,
  startEditing,
  cancelEditing,
  update,
  delete: _delete
};

function getAll() {
  return dispatch => {
    dispatch(request());

    projectService.getAll()
      .then(
        projects => dispatch(success(projects)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: projectConstants.GETALL_REQUEST } }
  function success(projects) { return { type: projectConstants.GETALL_SUCCESS, projects } }
  function failure(error) { return { type: projectConstants.GETALL_FAILURE, error } }
}

function create(name) {
  return dispatch => {
    dispatch(request());

    projectService.create({ name })
      .then(
        project => dispatch(success(project)),
        error => dispatch(failure(error.toString()))
      );
  };

  function request() { return { type: projectConstants.CREATE_REQUEST } }
  function success(project) { return { type: projectConstants.CREATE_SUCCESS, project } }
  function failure(error) { return { type: projectConstants.CREATE_FAILURE, error } }
}

function startEditing(id) { return { type: projectConstants.START_EDITING, id } }
function cancelEditing(id) { return { type: projectConstants.CANCEL_EDITING, id } }

function update(id, name) {
  return dispatch => {
    dispatch(request(id, name));

    projectService.update(id, { name })
      .then(
        () => dispatch(success(id, name)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id, name) { return { type: projectConstants.UPDATE_REQUEST, id, name } }
  function success(id, name) { return { type: projectConstants.UPDATE_SUCCESS, id, name } }
  function failure(id, error) { return { type: projectConstants.UPDATE_FAILURE, id, error } }
}

function _delete(id) {
  return dispatch => {
    dispatch(request(id));

    projectService.delete(id)
      .then(
        () => dispatch(success(id)),
        error => dispatch(failure(id, error.toString()))
      );
  };

  function request(id) { return { type: projectConstants.DELETE_REQUEST, id } }
  function success(id) { return { type: projectConstants.DELETE_SUCCESS, id } }
  function failure(id, error) { return { type: projectConstants.DELETE_FAILURE, id, error } }
}
