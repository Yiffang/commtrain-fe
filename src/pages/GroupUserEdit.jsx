import { Modal, Table,Button, Space, Statistic, Select} from 'antd';
import  { useState } from 'react';
import {  ConsoleSqlOutlined, DeleteOutlined, } from '@ant-design/icons';
import { PageContainer, } from '@ant-design/pro-layout';
import { connect } from 'umi';


//这是选择器数据
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}



const Groupuseredit= (props) => {

  //这是表格的样式
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
        const {UserID} = record;
        return (
          <>
            <Button
              onChange={(UserID) => removeGruopuser(UserID)}
              type="link"
              icon={<DeleteOutlined />}
            >
               
              </Button>
          </>
        );
      } 
    },
];
  //model相关变量
  console.log(props);
  const { groupuserModel, dispatch } = props;
  const { groupuserlist } = groupuserModel;
  console.log(groupuserlist);

//移除群组成员
const removeGruopuser=(props)=>{
  console.log(props);
  dispatch({
    type:'groupuserModel/removeUser',
     payload:{loginID:props},
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


    return (
      <div>
        <PageContainer
          title="群组名称"
          extraContent={
            <Space size={24}>
              <Statistic title="项目数" value={16} />
              <Statistic title="文档数" value={208} />
              <Statistic title="项目访问" value={2223} />
            </Space>
          }
          tabList={[
            {
              tab: '首页',
              key: '1',
            },
            {
              tab: '项目',
              key: '2',
            },
            {
              tab: '收藏',
              key: '3',
            },
            {
              tab: '成员',
              key: '4',
            },
          ]}
        ></PageContainer>
        
        <div
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
      </div>
    );
  };

  export default connect(({ groupuserModel }) => ({
    groupuserModel,
  }))(Groupuseredit);