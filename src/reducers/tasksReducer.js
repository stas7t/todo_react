import { taskConstants } from '../constants';

export function tasks(state = {}, action) {
  switch (action.type) {
  // GET
  case taskConstants.GETALL_REQUEST:
    return {
      loading: true
    };
  case taskConstants.GETALL_SUCCESS:
    return {
      items: action.tasks
    };
  case taskConstants.GETALL_FAILURE:
    return {
      error: action.error
    };

  // CREATE
  case taskConstants.CREATE_REQUEST:
    return {
      ...state,
      creating: true
    };
  case taskConstants.CREATE_SUCCESS:
    return {
      ...state,
      creating: false,
      items: state.items.concat(action.task)
    };
  case taskConstants.CREATE_FAILURE:
    return {
      ...state,
      creating: false,
      error: action.error
    };

  // EDIT
  case taskConstants.START_EDITING:
    return {
      ...state,
      items: state.items.map(task =>
        task.id === action.id ? { ...task, editing: true } : task
      )
    };
  case taskConstants.CANCEL_EDITING:
    return {
      ...state,
      items: state.items.map(task =>
        task.id === action.id ? { ...task, editing: false } : task
      )
    };

  // UPDATE
  case taskConstants.UPDATE_REQUEST:
    return {
      ...state,
      items: state.items.map(task =>
        task.id === action.id ? { ...task, updating: true } : task
      )
    };
  case taskConstants.UPDATE_SUCCESS:
    return {
      ...state,
      items: state.items.map(task =>
        task.id === action.id ? { ...task, name: action.name, updating: false, editing: false } : task
      )
    };
  case taskConstants.UPDATE_FAILURE:
    return {
      ...state,
      items: state.items.map(task => {
        task.id === action.id ? { ...task, updateError: action.error, updating: false } : task
      })
    };

  // DELETE
  case taskConstants.DELETE_REQUEST:
    return {
      ...state,
      items: state.items.map(task =>
        task.id === action.id ? { ...task, deleting: true } : task
      )
    };
  case taskConstants.DELETE_SUCCESS:
    return {
      items: state.items.filter(task => task.id !== action.id)
    };
  case taskConstants.DELETE_FAILURE:
    return {
      ...state,
      items: state.items.map(task => {
        task.id === action.id ? { ...task, deleteError: action.error, deleting: false } : task
      })
    };

  default:
    return state
  }
}
