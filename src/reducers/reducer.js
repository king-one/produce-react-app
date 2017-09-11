/**
 * Created by cg on 2017/9/1.
 */
import { combineReducers } from 'redux';
const modify = (state=false, action) => {
  switch (action.type) {
    case 'CHANGE_PASSWORD':
      return action.text;
      break;
    case 'CHANGE_RESONCE':
      return action.text;
    default:
      return state
  }
};
const UserModify = combineReducers({
  modify
});
export default  UserModify;

