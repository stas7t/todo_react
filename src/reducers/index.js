import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { projects } from './projectsReducer';
import { alert } from './alertReducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  projects,
  alert
});

export default rootReducer;
