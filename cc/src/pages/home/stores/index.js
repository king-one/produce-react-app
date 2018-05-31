/**
 * Created by cg on 2017/9/1.
 */
import { createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/reducer';
const dev = process.env.NODE_ENV === 'development';
const createStoreCompose = compose(applyMiddleware(thunk),
       dev && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({
           actionSanitizer:action =>({
               ...action,
               type: typeof(action.type) === 'symbol' ? String(action.type) : action.type  // devtool 查看不到symbol类型的acttion
           })
       }): f => f
)(createStore)
const Store = createStoreCompose(reducers)
export default Store;