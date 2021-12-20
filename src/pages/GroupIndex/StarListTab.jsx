
import React, { Component } from 'react';
import { Row, Col ,PageHeader,Tabs,Table,Button,Popover,Input, Space, Card, Divider } from 'antd';
import { StarTwoTone,EditTwoTone,DeleteTwoTone,getTwoToneColor, setTwoToneColor } from '@ant-design/icons';
import { history, connect } from 'umi';


const{Search} = Input;

const onSearch = value => console.log(value);

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


class StarListTab extends Component {

    

    render() {
        const { userModel, dispatch } = this.props;
        const { Collection, pageSize, pageNo, totalCount } = userModel;
        return (<div>            
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
  
                   </Card></div>)
    }
}
export default connect(({ userModel }) => ({
    userModel,
  }))(StarListTab);