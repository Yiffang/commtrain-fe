import { Button, Result, Card, Table, Modal, Form, Input, Row,Col, Divider, Space, Pagination, Tabs,message } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { history, connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { StarTwoTone,EditTwoTone} from '@ant-design/icons';
import 'antd/dist/antd.css';

//对话框的操作
const {confirm} = Modal;
const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function showEDIT(){
  confirm({
    title:'编辑项目',
    content:<>
       <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="新项目名称"
        name="新项目名称"
        rules={[{ required: false, message: '请输入新项目名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="新项目简介"
        name="新项目简介"
        rules={[{ required: false, message: '请输入新项目简介' }]}
      >
        <Input />
      </Form.Item>
      </Form>
    </>,
    icon:null,
    onOk(){
      console.log('OK');
    },
    onCancel(){
      console.log('Cancle');
    },
  });
}

function showCOLLECT(){
  confirm({
    title:'收藏',
    content:'确认取消收藏么',
    onOk(){
      console.log('OK');
      message.success('取消收藏成功');
    },
    onCancel(){
      console.log('Cancel');
    },
  });
}



//表格样式
const columns = [{
  title:'项目',
  dataIndex:'program',
  key: 'program',
  sorter:true,
}, {
  title: '项目简介',
  dataIndex: 'progIntro',
  key: 'progIntro',
},{
  title:'创建者',
  dataIndex:'creator',
  key: 'creator',
},
{
  title:'创建时间',
  dataIndex:'createTime',
  key: 'createTime',
  sorter:true,
},{
  title:'操作',
  dataIndex:'opeation',
  key: 'opeation',
  render: (edit,star) => 
  <Space size='middle'>
      
    <EditTwoTone onClick={showEDIT}/>
    <StarTwoTone  onClick={showCOLLECT}/>
  </Space>
}
]
//以下是数据集
const data = [
  {
    key:1,
    program:'项目1名称',
    progIntro:'描述项目内容',
    creator:'张三',
    createTime:'2021-10-31 23:12:00',

  },
  {
    key:2,
    program:'项目2名称',
    progIntro:'描述项目内容',
    creator:'李四',
    createTime:'2021-09-31 23:12:00',

  },
  {
    key:3,
    program:'项目2名称',
    progIntro:'描述项目内容',
    creator:'王五',
    createTime:'2021-08-31 23:12:00',

  },
]




const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const {TabPane} = Tabs;






class Collection extends Component {
  callback=(key)=> {
    console.log(key);
  }
  
  handleTableChange = (pagination, sorter,pageNo, pageSize) => {
    const {dispatch} = this.props;
    dispatch({
      type:'userModel/changeState',
      payload:{
        pageNo,
        pageSize
      }
    })
    dispatch({
      type: 'userModel/fetch',
      payload: {
        pageNo, pageSize
      }
    })
    this.fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
    });
  };



  render() {
    const{Search} = Input
    const onSearch = value => console.log(value)
    const { userModel, dispatch } = this.props;
    const { Collection, pageSize, pageNo, totalCount } = userModel;
    return (
      <div>  
          <Card>
           <Row justify="end">
             <Col span={8}> <Search placeholder="请输入项目名称" onSearch={onSearch}  enterButton/> </Col>
           </Row>
           <Divider/>
             <Table columns={columns} dataSource={data} rowKey="loginName" pagination={{
               current: pageNo,
               total: totalCount,
               pageSize: pageSize,
               onChange: this.handleTableChange
             }}/>  
           </Card>
       </div>);
  }
}

export default connect(({ userModel }) => ({
  userModel,
}))(Collection);
