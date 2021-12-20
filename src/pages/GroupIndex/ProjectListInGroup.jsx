
import React, { Component } from 'react';
import { Row, Col ,PageHeader,Tabs,Table,Button,Popover,Input, Space, Card, Divider } from 'antd';
import { StarTwoTone,EditTwoTone,DeleteTwoTone,getTwoToneColor, setTwoToneColor } from '@ant-design/icons';

const{Search} = Input;

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
      render: (edit,star) => (
        <Space size="middle">
          <a><EditTwoTone /></a>
          <a><DeleteTwoTone /></a>
        </Space>
      ),
    },
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
  ];

  const onSearch = value => console.log(value)


class ProjectListInGroup extends Component {

    

    render() {
        return (<div>            
            <Card>
            <Row justify="end">
               <Col span={8}> <Search placeholder="请输入项目名称" onSearch={onSearch}  enterButton/> </Col>
            </Row>

            <Divider/>
            <Table columns={columns_projectlist} dataSource={data_projectlist} />


            </Card>  </div>)
    }
}
export default ProjectListInGroup;