import { Modal, Table,Button, Space, Statistic, Select, Tabs} from 'antd';
import  { useState } from 'react';
import {  ConsoleSqlOutlined, DeleteOutlined, } from '@ant-design/icons';
import { PageContainer, } from '@ant-design/pro-layout';
import { connect } from 'umi';
import CardListTab from './CardListTab';
import ProjectListInGroup from './ProjectListInGroup';
import StarListTab from './StarListTab';
import MemberListInGroup from './MemberListInGroup';
const {TabPane} = Tabs;




function handleChange(value) {
  console.log(`selected ${value}`);
}



const GroupIndexLayout= (props) => {

    //model相关变量
    console.log(props);
    const { groupuserModel, dispatch } = props;
    const { groupuserlist, currentTabKey } = groupuserModel;
    console.log(groupuserlist);
  
  //移除群组成员
  const removeGruopuser=(loginname)=>{
    console.log(loginname);
    dispatch({
      type:'groupuserModel/removeUser',
       payload:{loginID:loginname},
       })
       }  ;
  
  const handleTabChange=(value)=>{
    dispatch({
      type: 'groupuserModel/changeState',
      payload:{
        currentTabKey: value,
      }
    })
  }

  //这是表格的样式




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
    let tabContent;
    if(currentTabKey == '1') {
      tabContent = (<CardListTab/>)
    }
    if(currentTabKey == '2') {
      tabContent =(<ProjectListInGroup/>)
    }
    if(currentTabKey == '3') {
      tabContent = (<StarListTab/>)
    }
    if(currentTabKey == '4') {
      tabContent =(<MemberListInGroup/>)
    }


    return (
      <div>
        <PageContainer
          title="群组名称"
          tabBarExtraContent = {
            <Space size={24}>
              <Statistic title="项目数" value={16} />
              <Statistic title="文档数" value={208} />
              <Statistic title="项目访问" value={2223} />
            </Space>
          }
          tabActiveKey={currentTabKey}
          onTabChange={handleTabChange}
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

        >



        </PageContainer>

        
        {/* <Tabs defaultActiveKey="1">
          <TabPane tab="首页" key="1" ><CardListTab/></TabPane>
          <TabPane tab="项目" key="2" ><ProjectListInGroup/></TabPane>
          <TabPane tab="收藏" key="3" ><StarListTab/></TabPane>
          <TabPane tab="成员" key="4" ><MemberListInGroup/></TabPane>
        </Tabs> */}
        {tabContent}
        
      </div>
    );
  };

  export default connect(({ groupuserModel }) => ({
    groupuserModel,
  }))(GroupIndexLayout);