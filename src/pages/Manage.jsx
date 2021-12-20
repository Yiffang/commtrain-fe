import { Button, Result, Card, Table, Modal, Form, Input, Row, Divider, PageHeader } from 'antd';
import React, { Component } from 'react';
import { history, connect } from 'umi';
import ProTable from '@ant-design/pro-table';





const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class UserList extends Component {

  onChangeField(name, e){
    const {dispatch} = this.props;
    dispatch({
      type:'userModel/changeState',
      payload: {
        [name]: e.target.value,
      }
    })
  }

  onClickAddUser=()=>{
    const {dispatch} = this.props;
    dispatch({
      type:'userModel/addUser',
      payload:{},
    })
  }

  onChangePage =(pageNo, pageSize)=>{
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
  }

  render() {
    const { userModel, dispatch } = this.props;
    const { userList, modalVisible,addLoginName,addNickName, pageSize, pageNo, totalCount } = userModel;

    const columns = [{
        title:'账号',
        dataIndex:'loginName',
        key: 'loginName',
      }, {
        title: '所属人姓名',
        dataIndex: 'realName',
        key: 'realName',
      },{
          title:'开立时间',
          dataIndex:'time',
          key: 'time',
        },
        {
          title:'操作',
          dataIndex:'password',
          key: 'password',
        },]
    //console.log(userList);
    //console.log('jsx');
    return (
      <div>
        <Card>
         <Row>
        <PageHeader
             className="site-page-header"
             title="账户管理"
         />
      </Row>
            <Divider orientation="left"></Divider>
            <Form name="basic" layout="inline" {...layout}>
              <Form.Item label="账号" name="loginName" >
                <Input placeholder="请输入" value={addLoginName} onChange={this.onChangeField.bind(this,'addLoginName')}/>
              </Form.Item>
              <Form.Item label="初始密码" name="nickName" >
                <Input  placeholder="请输入" value={addNickName} onChange={this.onChangeField.bind(this, 'addNickName')}/>
              </Form.Item>
              <Form.Item {...layout}>
                <Button type="primary" onClick={this.onClickAddUser}>
                  新增用户
                </Button>
              </Form.Item>
            </Form>

 
            <Divider/>
          <Table columns={columns} dataSource={userList} rowKey="loginName" pagination={{
            current: pageNo,
            total: totalCount,
            pageSize: pageSize,
            onChange: this.onChangePage
          }}/>
        </Card>
      </div>);
  }
}
export default connect(({ userModel }) => ({
  userModel,
}))(UserList);