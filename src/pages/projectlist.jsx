import { Button, Result, Card, Table, Modal, Form, Input, Row,Col, Divider, Space, Pagination, Tabs } from 'antd';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { history, connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { StarTwoTone,EditTwoTone,EditFilled} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Tag } from 'antd';


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
      
    <a><EditTwoTone twoToneColor="blue"/></a>

    <a><StarTwoTone twoToneColor="red" /></a>
  </Space>
}
]
/*
以下是数据集
*/

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


const columns_projectlist = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data_projectlist = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const {TabPane} = Tabs;
/*
ReactDOM.render(
  
    
        <Table columns={columns} dataSource={data} />, document.getElementById('root') 

    

  
);*/






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

        <Tabs defaultActiveKey="1">
          <TabPane tab="首页" key="1" >
            
  
          </TabPane>
          <TabPane tab="项目" key="2">

            <Card>
            
            <Row justify="end">
               <Col span={8}> <Search placeholder="请输入项目名称" onSearch={onSearch}  enterButton/> </Col>
            </Row>

            <Divider/>
            <Table columns={columns_projectlist} dataSource={data_projectlist} />


            </Card>  

          </TabPane>

          <TabPane tab="收藏" key="3">
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
          </TabPane>
          <TabPane tab="成员" key="4">
            Content of Tab Pane 4
          </TabPane>
        </Tabs>
       

      </div>);
  }
}

export default connect(({ userModel }) => ({
  userModel,
}))(Collection);
