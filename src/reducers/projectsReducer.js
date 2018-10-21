import { projectConstants } from '../constants';

export function projects(state = {}, action) {
  switch (action.type) {
  // GET
  case projectConstants.GETALL_REQUEST:
    return {
      loading: true
    };
  case projectConstants.GETALL_SUCCESS:
    return {
      items: action.projects
    };
  case projectConstants.GETALL_FAILURE:
    return {
      error: action.error
    };

  // CREATE
  case projectConstants.CREATE_REQUEST:
    return {
      ...state,
      creating: true
    };
  case projectConstants.CREATE_SUCCESS:
    return {
      ...state,
      creating: false,
      items: state.items.concat(action.project)
    };
  case projectConstants.CREATE_FAILURE:
    return {
      ...state,
      creating: false,
      error: action.error
    };

  // EDIT
  case projectConstants.START_EDITING:
    return {
      ...state,
      items: state.items.map(project =>
        project.id === action.id ? { ...project, editing: true } : project
      )
    };
  case projectConstants.CANCEL_EDITING:
    return {
      ...state,
      items: state.items.map(project =>
        project.id === action.id ? { ...project, editing: false } : project
      )
    };

  // UPDATE
  case projectConstants.UPDATE_REQUEST:
    return {
      ...state,
      items: state.items.map(project =>
        project.id === action.id ? { ...project, updating: true } : project
      )
    };
  case projectConstants.UPDATE_SUCCESS:
    return {
      ...state,
      items: state.items.map(project =>
        project.id === action.id ? { ...project, name: action.name, updating: false, editing: false } : project
      )
    };
  case projectConstants.UPDATE_FAILURE:
    return {
      ...state,
      items: state.items.map(project => {
        project.id === action.id ? { ...project, updateError: action.error, updating: false } : project
      })
    };

  // DELETE
  case projectConstants.DELETE_REQUEST:
    // add 'deleting:true' property to project being deleted
    return {
      ...state,
      items: state.items.map(project =>
        project.id === action.id ? { ...project, deleting: true } : project
      )
    };
  case projectConstants.DELETE_SUCCESS:
    // remove deleted project from state
    return {
      items: state.items.filter(project => project.id !== action.id)
    };
  case projectConstants.DELETE_FAILURE:
    return {
      ...state,
      items: state.items.map(project => {
        project.id === action.id ? { ...project, deleteError: action.error, deleting: false } : project
      })
    };

  default:
    return state
  }
}
