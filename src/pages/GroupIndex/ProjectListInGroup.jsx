
import React, { Component } from 'react';
import { Row, Col ,PageHeader,Tabs,Table,Button,Popover,Input, Space, Card, Divider, Modal, Form } from 'antd';
import { StarTwoTone,EditTwoTone,DeleteTwoTone,getTwoToneColor, setTwoToneColor } from '@ant-design/icons';
import { history, connect } from 'umi';

const{Search} = Input;

//对话框
const {confirm} = Modal;
const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function showEdit(){
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
      console.log('Cancel');
    },
  });
}

function showDelete(){
  confirm({
    title:'删除',
    content:'确认要删除吗',
    onOk(){
      console.log('OK');
      message.success('删除成功');
    },
    onCancel(){
      console.log('Cancel');
    },
  });
}

const columns_projectlist = [
    {
      title: '项目',
      dataIndex: 'projectlist_name',
      key: 'projectlist_name',
      render: text => <a>{text}</a>,
    },
    {
      title: '项目简介',
      dataIndex: 'projectlist_intro',
      key: 'projectlist_intro',
    },
    {
      title: '创建者',
      dataIndex: 'projectlist_creator',
      key: 'projectlist_creator',
    },
    {
      title: '创建时间',
       dataIndex: 'projectlist_createtime',
      key: 'projectlist_createtime',
    },
    {
      title: '操作',
      key: 'action',
      render: (edit,del) => 
        <Space size="middle">
          <a><EditTwoTone onClick={showEdit}/></a>
          <a><DeleteTwoTone onClick={showDelete}/></a>
        </Space>
        
      
    }
  ];

  const data_projectlist = [
    {
      key: '1',
      projectlist_name: '金融科技发展项目1',
      projectlist_intro: 1111,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '2',
      projectlist_name: '金融科技发展项目2',
      projectlist_intro: 22222,
      projectlist_creator: '杜思佳111',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '3',
      projectlist_name: '金融科技发展项目3',
      projectlist_intro: 3333,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '4',
      projectlist_name: '金融科技发展项目1',
      projectlist_intro: 1111,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '5',
      projectlist_name: '金融科技发展项目1',
      projectlist_intro: 1111,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '6',
      projectlist_name: '金融科技发展项目1',
      projectlist_intro: 1111,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '7',
      projectlist_name: '金融科技发展项目1',
      projectlist_intro: 1111,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '8',
      projectlist_name: '金融科技发展项目1',
      projectlist_intro: 1111,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '9',
      projectlist_name: '金融科技发展项目1',
      projectlist_intro: 1111,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '10',
      projectlist_name: '金融科技发展项目1',
      projectlist_intro: 1111,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '11',
      projectlist_name: '金融科技发展项目1',
      projectlist_intro: 1111,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
    {
      key: '12',
      projectlist_name: '金融科技发展项目1',
      projectlist_intro: 1111,
      projectlist_creator: '杜思佳',
      projectlist_createtime: '2021/12/20 12:35',
    },
  ];

  const onSearch = value => console.log(value)


class ProjectListInGroup extends Component {

    

    render() {
      const { userModel, dispatch } = this.props;
      const { Collection, pageSize, pageNo, totalCount } = userModel;
        return (
          <div>            
            <Card style={{marginTop:'20px'}}>
              <Row justify="end">
                <Col span={8}> <Search placeholder="请输入项目名称" onSearch={onSearch}  enterButton/> </Col>
              </Row>

              <Divider/>
                <Table columns={columns_projectlist} dataSource={data_projectlist} />


            </Card>  

          </div>
          
          )
    }
}
export default connect(({ userModel }) => ({
  userModel,
}))(ProjectListInGroup);