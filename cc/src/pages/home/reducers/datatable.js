/*
 * @Author: chen gong 
 * @Date: 2018-01-11 15:01:56 
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-01-23 13:18:37
 */

import types from "../types";
const initialState = {};
const switchType = {
  [types.loadTable] :(state,action) =>{
    Object.keys(action).map( v => state[v] = action[v]);
    return state;
  },
  [types.transformStructure] :(state,action) =>{
    Object.keys(action).map( v => state[v] = action[v]);
    return state;
  },
  [types.updateDisplayName] :(state,action) =>{
    Object.keys(action).map( v => state[v] = action[v]);
    return state;
  },
   [types.fixtitle] :(state,action) =>{
    Object.keys(action).map( v => state[v] = action[v]);
    return state;
  },
  [types.analysisRetry] :(state,action) =>{
    Object.keys(action).map( v => state[v] = action[v]);
    return state;
  },
  [types.analysisFail] :(state,action) =>{
    Object.keys(action).map( v => state[v] = action[v]);
    return state;
  },
  [types.analysing] :(state,action) =>{
    Object.keys(action).map( v => state[v] = action[v]);
    return state;
  },
  [types.analysisSuccess] :(state,action) =>{
  Object.keys(action).map( v => state[v] = action[v]);
  return state;
},
  [types.dataStatePolling] :(state,action) =>{
    Object.keys(action).map( v => state[v] = action[v]);
    return state;
  }
};
export default {
  switchType,
  initialState
};

