import * as userlistService from '../services/userlist';
import { message } from 'antd'


export default {
    namespace: 'userModel',
    state: {
        userList: [],
        modalVisible: false,
        addLoginName: '',
        addNickName: '',
        pageSize: 10,
        pageNo: 1,
        totalCount: 0,
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname == '/demo') {
                    dispatch({
                        type: 'reloadList',
                        payload: {},
                    });
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

        *reloadList({}, { put, select}) {
            const { pageNo, pageSize} = yield select(state=>state.userModel);
            yield put({
                type: 'fetch',
                payload: {
                    pageNo,
                    pageSize,
                }
            })
        },

        *fetch({payload}, { call, put }) {
            const {pageNo, pageSize} = payload;
            const { flag, data, msg } = yield call(userlistService.listAllUser, {
                pageNum: pageNo-1,
                pageSize,
            });
            const { records, totalCount, pageNum } = data;
            if(flag) {
                yield put({
                    type: 'changeState',
                    payload: {
                        userList: records,
                        totalCount,
                        pageNo: pageNum +1, //前端页号需要加1
                    }
                })
            }
        },

        *addUser({}, {call, put,select}) {
            const {addLoginName,addNickName}= yield select(state=>state.userModel);
            const {flag, msg} = yield call(userlistService.addUser,{
                loginName: addLoginName,
                nickName: addNickName,
            });
            if(flag) {
                yield put({
                    type: 'reloadList',
                    payload: {
                    }
                })
                message.success(msg);
            }   else {
                message.success(msg);
            }
        },
    },
  };