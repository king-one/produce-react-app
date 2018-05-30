/*
 * @Author: chen gong 
 * @Date: 2018-01-11 14:21:11 
 * @Last Modified by: chen gong
 * @Last Modified time: 2018-01-26 14:35:01
 */
import { bindActionCreators } from 'redux';
import xhr from 'common/src/xhr';
import Jsutils from "modules/jsutils";
import store from '../store';
import types from '../types';
import moment from 'moment'
const datasourceId = Jsutils.getQuery('dsId');
const originMapper = {
  'dev229': 'http://dev229:7070/',
  '127.0.0.1': 'http://192.168.0.229:7070/',
  'localhost': 'http://192.168.0.229:7070/',
  '192.168.0.229': 'http://192.168.0.229:7070/'
};
const hostname = window.location.hostname;
const origin = hostname in originMapper ? originMapper[hostname] : '/';
const getPageSize = e =>{
     return parseInt((window.innerHeight - 250)/40);
}
const pageSize = getPageSize();
const loadTable = (param, callBack) => (dispatch, getState) => {
  const { pageNum, orderColumn,orderRule} = param;
  const { datatable } = getState()
  xhr.post('/datasource/more', {
    datasourceId,
    pageSize,
    pageNum: pageNum || datatable.pageNum,
    orderRule,
    orderColumn
  }, rep => {
    const { data, schemas, titleFixed, state, recordsTotal, name } = rep.result;
    debugger
    dispatch({
      type: types.loadTable,
      datasourceId,
      tabledata: data,
      dataName: name,
      schemas,
      titleFixed,
      datastate: state,
      recordsTotal,
      pageSize: 20,
      pageNum,
      analysing: true,
      analysisFail: false,
      analysisRetry: false
    })
    callBack && callBack(rep.result)
  })
};
//Unavailable 状态下 前台改变数据
const dataTransform = (originData, dataType) => {
  try {
    switch (dataType) {
      case 'Date':
        originData = moment(originData.replace(/\D/g, '')).isValid() ? moment(originData.replace(/\D/g, '')).format('YYYY - MM - DD') : originData;
        break;
      case 'Time':
        originData = originData.format(moment(originData, ['HHmm'], ['HHmmss'])._f)
        break;
      case 'DateTime':
        originData = originData.replace(/\D/g, '').substring(0, 17);
        originData = moment(originData).isValid() ? originData.format(moment(originData, ['YYYY-MM-DD HH:mm'], ['YYYY-MM-DD HH:mm:ss'], ['YYYY-MM-DD HH:mm:ss:SSS'])._f) : originData;
        break;
      case 'Rounded':
        originData = originData.match(/[\d\-\.]/g) ? originData.match(/[\d\-\.]/g).join('').split('.')[0] : originData
        break
      case 'Percent':
      case 'Decimal':
      case 'Money':
        originData = originData.match(/[\d\-\.]/g) ? originData.match(/[\d\-\.]/g).join('') : originData
        break;
      default:
        break;
    }
  } catch (e) {
    throw new Error(e);

  }
  return originData;
}

const transformStructure = param => (dispatch, getState) => {
  xhr.post('/datasource/schema/update', param, data => {
    const {id, structure} = param;
    const state = getState();
    let colum = null;
    state.datatable.schemas.forEach((v, k) => {
      if (v.id === id) {
        colum = k;
        v.structure = structure;
        v.confirmed = true;
      }
    })
    dispatch({
      type: types.transformStructure,
      schemas: state.datatable.schemas,
    });
    console.log(state.datatable.tabledata);
    const newTabledata = state.datatable.tabledata.map(v => v.map((val, k) => {
      if (colum === k) {
        return dataTransform(val, structure)
      }else{
        return val
      }
    }));
    dispatch({
      type: types.transformStructure,
      tabledata: newTabledata
    })
  })
};
const updateDisplayName = param => (dispatch, getState) => {
  xhr.post('/datasource/schema/updateDisplayName', param, data => {
    const {id, displayName} = param;
    const state = getState();
    state.datatable.schemas.forEach(v => v.id === id && (v.displayName = displayName))
    dispatch({
      type: types.updateDisplayName,
      schemas: state.datatable.schemas
    })
  })
};

const fixTitle = param => (dispatch, getState) => {
  xhr.post('/datasource/fix_title/' + datasourceId, param, data => {
  })
}
const dataStatePolling = (callback, error) => (dispatch, getState) => {
  $.ajax({
    url: origin + 'upload/check/' + datasourceId,
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    success: data => {
      const state = data.result;
      dispatch({
        type: types.dataStatePolling,
        datastate: state,
      });
      callback && callback(data)
    },
    error: data => {
      error && error()
    }
  })
}
const retry = (callback, error) => (dispatch, getState) => {
  $.ajax({
    url: origin + 'upload/retry/' + datasourceId,
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    success: data => {
      callback && callback(data)
    },
    error: data => {
      error && error(data)
    }
  })
}
const analysisFail = type => (dispatch, getState) => {
  dispatch({
    type: types.analysisFail,
    analysing: false,
    analysisFail: true,
    analysisRetry: false
  })
}
const analysing = type => (dispatch, getState) => {
  dispatch({
    type: types.analysing,
    analysing: true,
    analysisFail: false,
    analysisRetry: false
  })
}
const analysisSuccess = type => (dispatch, getState) => {
  dispatch({
    type: types.analysisSuccess,
    analysing: false,
    analysisFail: false,
    analysisRetry: false
  })
}
const analysisRetry = type => (dispatch, getState) => {
  dispatch({
    type: types.analysisRetry,
    analysing: false,
    analysisFail: false,
    analysisRetry: true

  })
}
const Action = bindActionCreators({
    loadTable,
    transformStructure,
    updateDisplayName,
    fixTitle,
    dataStatePolling,
    retry,
    analysisFail,
    analysing,
    analysisRetry,
    analysisSuccess
  },
  store.dispatch)
export default Action