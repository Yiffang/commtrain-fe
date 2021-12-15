import { ListContext } from "antd/lib/list";
import * as folderService from '../services/folder';
import { message } from 'antd'


export default {
    namespace: 'docModel',
    state: {listcontent:[{ name: 'dva', id: 1 },{ name: 'antd', id: 2 }],
        createFolderVisible:false,
        editFolderVisible:false,
        project_code: "1",
        project_name:'我的项目',
        addfoldername:'文件夹名称(必填)',
        editfoldername:'',
        editfolderid: -1,
        folderlist: [{folder_id:1,folder_name:'文件夹1'},{folder_id:2,folder_name:"文件夹2"}],
        pageSize: 10,
        pageNo: 1,
        totalCount: 2,
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname == '/cyf') {
                    /*dispatch({
                        type: 'reload',
                        payload: {},
                    });*/
                }
            });
        },
    },

    reducers: {
        changeState(state, {payload}) {
            return {
                ...state,
                ...payload,
            } 
        }
    },
    effects: {
        //reload/fetch文件夹
        *reloadFolder({}, {put, select}){
            yield put({
                type: 'fetchFolder',
                payload:{

                }
            })
        },
        *fetchFolder({}, {put, select, call}){
            const {project_code} = yield select(state=>state.docModel);
            console.log(project_code);
            const { flag, data, msg } = yield call(folderService.listAllFolder, {
                project_code: project_code,
            });
            const {project_folders} = data;
            console.log(project_folders);
            if (flag){
                yield put({
                    type: 'changeState',
                    payload:{
                        folderlist: project_folders,
                    }
                })
            };
        },
        //reload/fetch文件列表
        *reload({}, { put, select}) {
            const { pageNo, pageSize} = yield select(state=>state.docModel);
            yield put({
                type: 'fetch',
                payload: {
                    pageNo,
                    pageSize,
                }
            })
        },
        *fetch({payload}, { call, put }) {
            const {pageNo, pageSize, totalCount} = payload;
            /*const { flag, data, msg } = yield call(userlistService.listAllUser, {
                pageNum: pageNo-1,
                pageSize,
            });*/
            //const { records, totalCount, pageNum } = data;
            var flag = true;
            if(flag) {
                yield put({
                    type: 'changeState',
                    payload: {
                        //userList: records,
                        totalCount,
                        pageNo: pageNo, //前端页号需要加1
                    }
                })
            }
        },
        //新建文件夹及其弹窗控制
        *onClickCreateFolder({},{put}){
            yield put({type:'changeState',payload:{createFolderVisible:true}});
        },
        *createFolderVisibleCancel({},{put}){
            yield put({type:'changeState',payload:{createFolderVisible:false}});
        },
        *createFolderVisibleOk({},{put,select,call}){
            const {addfoldername,project_code} = yield select(state=>state.docModel);
            const {flag, msg} = yield call(folderService.addFolder,{
                project_code: project_code,
                folder_name: addfoldername,
            });
            yield put({type:'changeState',payload:{createFolderVisible:false}});
            if(flag) {
                yield put({
                    type: 'reloadFolder',
                    payload: {
                        
                    }
                })
                message.success(msg);
            }   else {
                message.error(msg);
            }
        },
        //编辑文件夹及其弹窗控制
        *onClickEditFolder({payload},{put}){
            const {id,name} = payload;
            yield put({type:'changeState',payload:{editfoldername:name,editfolderid:id,editFolderVisible:true}});
        },
        *editFolderVisibleCancel({},{put}){
            yield put({type:'changeState',payload:{editFolderVisible:false}});
        },
        *editFolderVisibleOk({},{put,select,call}){
            const {editfoldername,editfolderid,project_code} = yield select(state=>state.docModel);
            const {flag, msg} = yield call(folderService.editFolder,{
                project_code: project_code,
                folder_name: editfoldername,
                folder_id: editfolderid,
            });
            console.log(editfoldername+editfolderid);
            yield put({type:'changeState',payload:{editFolderVisible:false}});
            if(flag) {
                yield put({
                    type: 'reloadFolder',
                    payload: {
                        
                    }
                })
                message.success(msg);
            }   else {
                message.error(msg);
            }
        },
        //删除文件夹
        *deleteFolder({payload},{call,put,select}){
            const {id} = payload;
            const {project_code} = yield select(state=>state.docModel);
            const {flag, msg} = yield call(folderService.deleteFolder,{
                project_code: project_code,
                folder_id: id,
            });
            if(flag) {
                yield put({
                    type: 'reloadFolder',
                    payload: {
                        
                    }
                })
                message.success(msg);
            }   else {
                message.error(msg);
            }
        },
        //文档相关
        *deleteDoc({payload},{call,put,select}){
            const {id} = payload;
            const {listcontent} = yield select(state=>state.docModel);
            yield put({type:'changeState',payload:{listcontent:listcontent.filter(item => item.id !== id)}});
        }
        
    },
  };