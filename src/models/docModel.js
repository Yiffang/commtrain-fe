import { ListContext } from "antd/lib/list";
import * as folderService from '../services/folder';
import * as docService from '../services/doc';
import * as fileService from '../services/fileService';

import { message } from 'antd'


export default {
    namespace: 'docModel',
    state: {
        doclist:[],
        createFolderVisible:false,
        editFolderVisible:false,
        createDocVisible:false,
        showDocVisible:false,
        editDocVisible:false,
        shareDocVisible:false,
        shareContent:"",
        AlertVisible:false,
        aleartmessage:"默认警告信息",
        project_code: "1",
        project_name:'我的项目',
        addfoldername:'',
        editfoldername:'',
        editfolderid: -1,
        adddocname:'',
        adddocremark:'',
        editdocname:'',
        editdocremark:'',
        searchdocname:'',
        searchdocuser:'',
        remotefolderid: 1,
        flag_folderchange: false,
        folderlist: [{folder_id:1,folder_name:'文件夹1'},{folder_id:2,folder_name:"文件夹2"}],
        pageSize: 10,
        pageNo: 1,
        totalCount: 2,
    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                if (location.pathname == '/cyf') {
                    dispatch({
                        type: 'reloadFolder',
                        payload: {},
                    });
                    dispatch({
                        type: 'reloadDoc',
                        payload: {},
                    })
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
        //reload/fetch文件夹列表
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
        //reload/fetch文档列表
        *reloadDoc({}, { put, select}) {
            const { pageNo, pageSize} = yield select(state=>state.docModel);
            yield put({
                type: 'fetchDoc',
                payload: {
                    pageNo,
                    pageSize,
                }
            })
        },
        *fetchDoc({payload}, { call, put, select}) {
            const {pageNo, pageSize, totalCount} = payload;
            const {remotefolderid,project_code,flag_folderchange} = yield select(state=>state.docModel);
            let pageNum = 0;
            if (flag_folderchange){
                pageNum = 0;
            }
            else{
                pageNum = pageNo-1;
            }
            const { flag, data, msg } = yield call(docService.listAllDoc, {
                project_code,
                folder_id: remotefolderid,
                pageNum: pageNum,
                pageSize,
            });
            console.log(remotefolderid);
            if(flag) {
                const { folder_docs, cnt, current_page_num } = data;
                console.log(folder_docs, cnt ,current_page_num);
                yield put({
                    type: 'changeState',
                    payload: {
                        doclist: folder_docs,
                        totalCount: cnt, 
                        pageNo: current_page_num+1, //前端页号需要加1
                        flag_folderchange: false,
                    }
                })
            }
            else {
                yield put({type:'changeState',payload:{alertmessage:msg,AlertVisible:true,}});
            }
        },
        //新建文件夹
        *createFolderVisibleOk({},{put,select,call}){
            const {addfoldername,project_code} = yield select(state=>state.docModel);
            //判断输入异常
            if (addfoldername==''){
                yield put({type:'changeState',payload:{alertmessage:"文件夹名称为空",AlertVisible:true,createFolderVisible:false}});
                return;
            }
            if (addfoldername=='文件夹名称(必填)'){
                yield put({type:'changeState',payload:{alertmessage:"文件夹名称为默认",AlertVisible:true,createFolderVisible:false}});
                return;
            }
            if (addfoldername.length>=20){
                yield put({type:'changeState',payload:{alertmessage:"文件夹名称过长",AlertVisible:true,createFolderVisible:false}});
                return;
            }
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
            }   
            else {
                yield put({type:'changeState',payload:{alertmessage:msg,AlertVisible:true,}});
            }
        },
        //新建文档
        *createDocVisibleOk({},{put,select,call}){
            const {adddocname,adddocremark,remotefolderid,project_code} = yield select(state=>state.docModel);
            //判断输入异常
            if (adddocname==''){
                yield put({type:'changeState',payload:{alertmessage:"文档名称为空",AlertVisible:true,createDocVisible:false}});
                return;
            }
            if (adddocname=='文档名称(必填)'){
                yield put({type:'changeState',payload:{alertmessage:"文档名称为默认",AlertVisible:true,createDocVisible:false}});
                return;
            }
            if (adddocname.length>=20){
                yield put({type:'changeState',payload:{alertmessage:"文档名称过长",AlertVisible:true,createDocVisible:false}});
                return;
            }
            const {flag, msg} = yield call(docService.addDoc,{
                project_code: project_code,
                folder_id: remotefolderid,
                doc_name: adddocname,
                doc_remark: adddocremark,
                files_ob_id: "",
            });
            yield put({type:'changeState',payload:{createDocVisible:false}});
            if(flag) {
                yield put({
                    type: 'reloadDoc',
                    payload: {
                        
                    }
                })
                message.success(msg);
            }   
            else {
                yield put({type:'changeState',payload:{alertmessage:msg,AlertVisible:true,}});
            }
        },
        //编辑文件夹
        *editFolderVisibleOk({},{put,select,call}){
            const {editfoldername,editfolderid,project_code} = yield select(state=>state.docModel);
            //判断输入异常
            if (editfoldername==''){
                yield put({type:'changeState',payload:{alertmessage:"文件夹名称为空",AlertVisible:true,editFolderVisible:false,}});
                return;
            }
            if (editfoldername.length>=20){
                yield put({type:'changeState',payload:{alertmessage:"文件夹名称过长",AlertVisible:true,editFolderVisible:false,}});
                return;
            }
            const {flag, msg} = yield call(folderService.editFolder,{
                project_code: project_code,
                folder_name: editfoldername,
                folder_id: editfolderid,
            });
            yield put({type:'changeState',payload:{editFolderVisible:false}});
            if(flag) {
                yield put({
                    type: 'reloadFolder',
                    payload: {
                        
                    }
                })
                message.success(msg);
            }   else {
                yield put({type:'changeState',payload:{alertmessage:msg,AlertVisible:true,}});
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
                yield put({type:'changeState',payload:{alertmessage:msg}});
                yield put({
                    type: 'AlertVisibleOk',
                    payload:{

                    }
                });
            }
        },
        //删除文档
        *deleteDoc({payload},{call,put,select}){
            const {id} = payload;
            const {project_code,remotefolderid} = yield select(state=>state.docModel);
            const {flag, msg} = yield call(docService.deleteDoc,{
                project_code: project_code,
                folder_id: remotefolderid,
                doc_id: id,
            });
            if(flag) {
                yield put({
                    type: 'reloadDoc',
                    payload: {
                        
                    }
                })
                message.success(msg);
            }   else {
                yield put({type:'changeState',payload:{alertmessage:msg}});
                yield put({
                    type: 'AlertVisibleOk',
                    payload:{

                    }
                });
            }
        },
        //搜索文档(从当前列表筛选，目前写在前端)
        *searchDoc({},{put,select}){
            const {searchdocuser,searchdocname,doclist} = yield select(state=>state.docModel);
            console.log('test');
            var doclist_new = [];
            for (let i=0;i<doclist.length;i++){
                if ((searchdocuser.toString()==doclist[i].doc_creator.toString())
                    &&(doclist[i].doc_name.toString().indexOf(searchdocname.toString())!=-1)){
                    doclist_new.push(doclist[i]);
                }
            }
            console.log(doclist_new);
            yield put({
                type: 'changeState',
                payload: {
                    doclist: doclist_new,
                    totalCount: doclist_new.length, 
                    pageNo: 1, //前端页号需要加1
                }
            })
        }
    },
  };