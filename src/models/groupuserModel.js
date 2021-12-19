import * as groupuserlistService from '../services/groupuserlist';
import * as userlistService from '../services/userlist';

export default {
    namespace: 'groupuserModel',
    state: {
        groupuserlist : [],
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname == '/groupuseredit') {
                    dispatch({
                        type: 'fetch',
                        payload: {},
                        }   );
                }
            });
        }
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
        *fetch({payload}, { call, put }) {
            // const {searchType} = yield select(state=>state.groupModel);
            const {groupName}=payload;
            const { flag, data } = yield call(groupuserlistService.userlistGroup,{
                groupName:groupName,
            });
            const { groupuserlist } = data;
            console.log(groupuserlist);
            if(flag) {
                yield put({
                    type: 'changeState',
                    payload: {
                        groupuserlist,
                    }
                })
            }
        },

        *removeUser({}, {call, put,select}) {
            //const {addLoginName,addNickName}= yield select(state=>state.userModel);
            const {loginName}=payload;
            const {flag, msg} = yield call(userlistService.addUser,{
                loginName: loginName,
            });
            if(flag) {
                yield put({
                    type: 'fetch',
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
