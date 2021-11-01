import { Button, Result, Card, Table } from 'antd';
import React from 'react';
import { history } from 'umi';
import ProTable from '@ant-design/pro-table';

const columns = [{
  title:'账号',
  dataIndex:'loginName',
  key: 'loginName',
}, {
  title: '昵称',
  dataIndex: 'nickName',
  key: 'nickName',
}]

const dataSource = [{
  loginName: 'tanj_24',
  nickName: '谈健',
}, {
  loginName: 'one',
  nickName: '旺',
}]

const UserList = () => (
  <Card extra={<Button type="primary">新增用户</Button>}>
    <Table columns={columns} dataSource={dataSource} rowKey="loginName"/>
  </Card>
);

export default UserList;