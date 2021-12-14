import * as grouplistService from '../services/grouplist';

export default {
    namespace: 'groupModel',
    state: {
        grouplist : [],
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname == '/group') {
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
            const {pageNo, pageSize} = payload;
            const { flag, data } = yield call(grouplistService.listGroup);
            const { grouplist } = data;
            console.log(grouplist);
            if(flag) {
                yield put({
                    type: 'changeState',
                    payload: {
                        grouplist,
                    }
                })
            }
        },
    },
};