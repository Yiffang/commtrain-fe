export default {
    namespace: 'card',
    state: [{ name: 'dva', id: 1 },{ name: 'antd', id: 2 }],

    
    reducers: {
        'delete'(state, { payload: id }) {
            return state.filter(item => item.id !== id);
          },
        /*changeState(state, {payload}) {
            return {
                ...state,
                ...payload,
            } 
        }*/
    },
    effects: {

        
    },
  };