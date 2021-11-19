import * as fileService from '../services/fileService';
import { message } from 'antd'


export default {
    namespace: 'testModel',
    state: {
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname == '/demo') {

                }
            });
        },
    },

    reducers: {
    //   'delete'(state, { payload: id }) {
    //     return state.filter(item => item.id !== id);
    //   },
        changeState(state, {payload}) {
            return {
                ...state,
                ...payload,
            } 
        }
    },



    effects: {

        *uploadFile({}, { put, select}) {
            const {addLoginName,addNickName}= yield select(state=>state.userModel);
            const {flag, msg} = yield call(fileService.uploadFile,{
                loginName: addLoginName,
                nickName: addNickName,
            });            
            yield put({
                type: 'fetch',
                payload: {
                    pageNo,
                    pageSize,
                }
            })
        },
    },
  };