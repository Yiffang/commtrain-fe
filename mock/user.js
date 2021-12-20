import { stripBasename } from "history/PathUtils";

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req, res) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */

let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';

//缓存code为"1"的project_folder
let project_folders = []
project_folders.push({"folder_id":1,"folder_name":"文件夹1","folder_docs":[]})
project_folders.push({"folder_id":2,"folder_name":"文件夹2","folder_docs":[]})

const getAccess = () => {
  return access;
}; // 代码中会兼容本地 service mock 以及部署站点的静态数据

export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req, res) => {
    // if (!getAccess()) {
    //   res.status(401).send({
    //     data: {
    //       isLogin: false,
    //     },
    //     errorCode: '401',
    //     errorMessage: '请先登录！',
    //     success: true,
    //   });
    //   return;
    // }

    res.send({
      success: true,
      data: {
        name: 'Demo用户',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          {
            key: '0',
            label: '很有想法的',
          },
          {
            key: '1',
            label: '专注设计',
          },
          {
            key: '2',
            label: '辣~',
          },
          {
            key: '3',
            label: '大长腿',
          },
          {
            key: '4',
            label: '川妹子',
          },
          {
            key: '5',
            label: '海纳百川',
          },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: getAccess(),
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      },
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': async (req, res) => {
    const { password, username, type } = req.body;
    await waitTime(2000);

    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      return;
    }

    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  'POST /api/login/outLogin': (req, res) => {
    access = '';
    res.send({
      data: {},
      success: true,
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
      success: true,
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/user/list':(req, res) => {
    res.send({"flag":true,"msg":"批量查询成功","data":{"pageSize":10,"totalCount":2,"pageNum":0,"start":0,"totalPages":1,"records":[{"id":2,"loginName":"hahaha","nickName":"哈哈哈111","password":"hahaha"},{"id":1,"loginName":"tanj_24","nickName":"tanjian","password":"tanj_24"}]}})
  },
  'GET  /api/login/captcha': getFakeCaptcha,
  'GET /login/current':(req, res) => {
    res.send({"flag":true,"msg":"mock user","data":{"id":1,"name":"TEST USER","group_num":233,"user_pic_path":'icons/icon-64x64.png'}})
  },
  'POST /api/folder/add':async(req, res) => {
    await waitTime(1000);
    const {folder_name} = req.query;
    let folder_count = project_folders.length;
    project_folders.push({"folder_id":folder_count+1,"folder_name":folder_name,"folder_docs":[]});
    res.send({"flag":true,"msg":"创建文件夹成功","data":{}})
  },
  'POST /api/folder/update':async(req, res) => {
    await waitTime(1000);
    const {folder_name,folder_id} = req.query;
    const max_namelength = 20;
    if (folder_name.length>max_namelength){
      res.send({"flag":false,"msg":"文件名过长","data":{}})
      return;
    }
    let folder_count = project_folders.length;
    for (let i=0; i<folder_count; i++){
      if (project_folders[i].folder_id.toString()==folder_id.toString()){
        project_folders[i].folder_name = folder_name;
        break;
      }
    }
    res.send({"flag":true,"msg":"重命名文件夹成功","data":{}})
  },
  'POST /api/folder/delete':async(req, res) => {
    await waitTime(1000);
    const {folder_id} = req.query;
    let folder_count = project_folders.length;
    for (let i=0; i<folder_count; i++){
      if (project_folders[i].folder_id.toString()==folder_id.toString()){
        project_folders.splice(i,1);
        break;
      }
    }
    for (let i=0; i<folder_count-1; i++){
      project_folders[i].folder_id = i+1;
    }
    res.send({"flag":true,"msg":"删除文件夹成功","data":{}})
  },
  'GET /api/folder/list':async(req, res) => {
    await waitTime(1000);
    const {project_code} = req.query;
    if (project_code=='1'){
      res.send({"flag":true,"msg":"查询文件夹列表成功","data":{"project_folders":project_folders}})
    }
    //res.send({"flag":true,"msg":"查询文件夹列表成功","data":{"project_folders":[{"folder_id":1,"folder_name":"文件夹1"},{"folder_id":2,"folder_name":"文件夹2"},{"folder_id":3,"folder_name":"文件夹3"}]}})
  },
  'GET /api/doc/list':async(req, res) => {
    await waitTime(1000);
    const {project_code,folder_id,pageNum,pageSize} = req.query;
    if (project_code=='1'){
      let folder_count = project_folders.length;
      for (let i=0; i<folder_count; i++){
        if (project_folders[i].folder_id.toString()==folder_id.toString()){
          res.send({"flag":true,"msg":"查询文档列表成功","data":{"folder_docs":project_folders[i].folder_docs,'cnt':project_folders[i].folder_docs.length,'current_page_num':0}});
          return;
        }
      }
      res.send({"flag":false,"msg":"查询文档列表失败","data":{}});
      return;
    }
    //res.send({"flag":true,"msg":"查询文件夹列表成功","data":{"project_folders":[{"folder_id":1,"folder_name":"文件夹1"},{"folder_id":2,"folder_name":"文件夹2"},{"folder_id":3,"folder_name":"文件夹3"}]}})
  },
  'POST /api/doc/add':async(req, res) => {
    await waitTime(1000);
    const {project_code,folder_id,doc_name,doc_remark,files_ob_id} = req.query;
    if (project_code=='1'){
      let folder_count = project_folders.length;
      let index = 0;
      for (let i=0; i<folder_count; i++){
        if (project_folders[i].folder_id.toString()==folder_id.toString()){
          index= i;
          break;
        }
      }
      project_folders[index].folder_docs.push({'doc_name':doc_name,'doc_remark':doc_remark,'doc_creator':'TEST_USER'});
      for (let i=0; i<project_folders[index].folder_docs.length; i++){
        project_folders[index].folder_docs[i].doc_id = i+1;
      }
    }
    res.send({"flag":true,"msg":"创建文档成功","data":{}})
  },
  'POST /api/doc/delete':async(req, res) => {
    await waitTime(1000);
    const {doc_id,folder_id} = req.query;
    let folder_count = project_folders.length;
    for (let i=0; i<folder_count; i++){
      if (project_folders[i].folder_id.toString()==folder_id.toString()){
        let doc_count = project_folders[i].folder_docs.length;
        //console.log(doc_count,doc_id);
        for (let j=0; j<doc_count; j++){
          if (project_folders[i].folder_docs[j].doc_id.toString()==doc_id.toString()){
            project_folders[i].folder_docs.splice(j,1);
            break;
          }
        }
        for (let j=0; j<doc_count-1; j++){
          project_folders[i].folder_docs[j].doc_id = j+1;
        }
        res.send({"flag":true,"msg":"删除文档成功","data":{}});
        return;
      }
    }
    res.send({"flag":true,"msg":"删除文档成功","data":{}});
  },
};
