/**
 * Created by cg on 2017/9/1.
 */
import { createStore } from 'redux';
import UserModify from './reducers/reducer';
let store = createStore(UserModify);
export default store;
