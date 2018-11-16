import { taskConstants } from '../constants';
import { taskService } from '../services';

export const taskActions = {
  getAll,
  create,
  startEditing,
  cancelEditing,
  update,
  delete: _delete
};

function getAll(projectId) {
  return dispatch => {
    dispatch(request(projectId));

    taskService.getAll(projectId)
      .then(
        tasks => dispatch(success(projectId, tasks)),
        error => dispatch(failure(projectId, error.toString()))
      );
  };

  function request(projectId)        { return { type: taskConstants.GETALL_REQUEST, projectId } }
  function success(projectId, tasks) { return { type: taskConstants.GETALL_SUCCESS, projectId, tasks } }
  function failure(projectId, error) { return { type: taskConstants.GETALL_FAILURE, projectId, error } }
}

function create(projectId, name) {
  return dispatch => {
    dispatch(request(projectId));

    taskService.create(projectId, { name })
      .then(
        task => dispatch(success(projectId, task)),
        error => dispatch(failure(projectId, error.toString()))
      );
  };

  function request(projectId)        { return { type: taskConstants.CREATE_REQUEST, projectId } }
  function success(projectId, task)  { return { type: taskConstants.CREATE_SUCCESS, projectId, task } }
  function failure(projectId, error) { return { type: taskConstants.CREATE_FAILURE, projectId, error } }
}

function startEditing(projectId, id)  { return { type: taskConstants.START_EDITING,  projectId, id } }
function cancelEditing(projectId, id) { return { type: taskConstants.CANCEL_EDITING, projectId, id } }

function update(projectId, id, name) {
  return dispatch => {
    dispatch(request(projectId, id, name));

    taskService.update(id, { name })
      .then(
        () => dispatch(success(projectId, id, name)),
        error => dispatch(failure(projectId, id, error.toString()))
      );
  };

  function request(projectId, id, name)  { return { type: taskConstants.UPDATE_REQUEST, projectId, id, name } }
  function success(projectId, id, name)  { return { type: taskConstants.UPDATE_SUCCESS, projectId, id, name } }
  function failure(projectId, id, error) { return { type: taskConstants.UPDATE_FAILURE, projectId, id, error } }
}

function _delete(projectId, id) {
  return dispatch => {
    dispatch(request(projectId, id));

    taskService.delete(id)
      .then(
        () => dispatch(success(projectId, id)),
        error => dispatch(failure(projectId, id, error.toString()))
      );
  };

  function request(projectId, id) { return { type: taskConstants.DELETE_REQUEST, projectId, id } }
  function success(projectId, id) { return { type: taskConstants.DELETE_SUCCESS, projectId, id } }
  function failure(projectId, id, error) { return { type: taskConstants.DELETE_FAILURE, projectId, id, error } }
}
