import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { projects } from './projectsReducer';
import { tasks } from './tasksReducer';
import { alert } from './alertReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  projects,
  tasks,
  alert
});

export default rootReducer;
