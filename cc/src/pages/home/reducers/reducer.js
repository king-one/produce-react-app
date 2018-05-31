import { combineReducers } from 'redux';
import datatable from './datatable';
import Jsutils from "public/jsutils";
const createReducer = ({ initialState, switchType }) => (
  (state = initialState, action) => {
    return action.type in switchType
    ? switchType[action.type](Jsutils.deepClone(state), action)
    : state
  }
)
const combinedReducers = combineReducers({
  datatable: createReducer(datatable),
})
export default combinedReducers