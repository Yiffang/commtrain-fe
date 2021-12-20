import { Modal, Table,Button, Space, Statistic, Select, Tabs} from 'antd';
import  { useState } from 'react';
import {  ConsoleSqlOutlined, DeleteOutlined, } from '@ant-design/icons';
import { PageContainer, } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { Component } from 'react';

//这是选择器数据
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
const columns = [
    {
      title: '姓名',
      dataIndex: 'UserName', //待修改（从哪里找？），下同
      key: 'UserName',
      
    },
    {
      title: '账号',
      dataIndex: 'UserID',
      key: 'UserID',
    },
    {
      title: '角色',
      dataIndex: 'charactor',
      key: 'charactor',
      render: (text,record) => {
          return (
            <>
              <Select  defaultValue={text} style={{ width: 120 }} bordered={false}>
                <Option value="管理员">管理员</Option>
                <Option  value="成员">成员</Option>
              </Select>
            </>
          );
      }
    },
    {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (text,record)=>{
          const {loginName} = record;
          return (
            <DeleteOutlined style={{ fontSize: '16px', color: '#08c' }} onClick={()=>{console.log(loginName);removeGruopuser(loginName);}}/>
          );
        } 
      },
  ];

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  const MemberListInGroup = (props) => {

        //model相关变量
        console.log(props);
        const { groupuserModel, dispatch } = props;
        const { groupuserlist } = groupuserModel;
        console.log(groupuserlist);
      
      //移除群组成员
      const removeGruopuser=(loginname)=>{
        console.log(loginname);
        dispatch({
          type:'groupuserModel/removeUser',
           payload:{loginID:loginname},
           })
           }  ;

      //弹窗相关变量
      const [isModalVisible, setIsModalVisible] = useState(false);
      const showModal = () => {
        setIsModalVisible(true);
      };
      const handleOk = () => {
        setIsModalVisible(false);
      };
      const handleCancel = () => {
        setIsModalVisible(false);
      };

        return (<div><div
          style={{
            height: '5vh',
          }}
        >
          <Button type="primary" onClick={showModal}>
            +添加
          </Button>
          <Modal title="搜索添加" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Tags Mode"
              onChange={handleChange}
            >
              {children}
            </Select>
          </Modal>
        </div>
        <Table columns={columns} dataSource={groupuserlist} />
        </div>);
}

export default connect(({ groupuserModel }) => ({
    groupuserModel,
  }))(MemberListInGroup);