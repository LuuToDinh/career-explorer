import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { sessionReducer } from './reducers/sessionReducer';
import { jobReducer } from './reducers/jobReducer';
import { questionReducer } from './reducers/questionReducer';
import { accountReducer } from './reducers/accountReducer';
import { blacklistReducer } from './reducers/blacklistReducer';
import { candidateReducer } from './reducers/candidateReducer';
import { interviewerReducer } from './reducers/interviewerReducer';
import { interviewReducer } from './reducers/interviewReducer';
import { cvApplyReducer } from './reducers/cvApplyReducer';
import { eventReducer } from './reducers/eventReducer';
// import { deleteReducer } from './reducers/deleteReducer';
import { reportReducer } from './reducers/reportReducer';
import { candidateRolesReduccer } from './reducers/candidateRolesReduccer';
import { sendEmailReducer } from './reducers/forgotReducer';
import { candidateInfoReducer } from './reducers/candidateInfoReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  job: jobReducer,
  blist: blacklistReducer,
  question: questionReducer,
  event: eventReducer,
  candidate: candidateReducer,
  interviewer: interviewerReducer,
  interview: interviewReducer,
  cvApply: cvApplyReducer,
  account: accountReducer,
  report: reportReducer,
  candidateCurrent: candidateRolesReduccer,
  forgotPassword: sendEmailReducer,
  candidateInfo: candidateInfoReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
