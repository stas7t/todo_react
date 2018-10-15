import { projectConstants } from '../constants';
import { projectService } from '../services';
// import { alertActions } from '.';
// import { history } from '../helpers';

export const projectActions = {
  getAll,
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

// prefixed function name with underscore because delete is a reserved word in javascript
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
