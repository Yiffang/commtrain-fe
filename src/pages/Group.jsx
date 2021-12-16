import { Row, Col ,PageHeader,Tabs,Table,Button,Popover,Input, Space } from 'antd';
import {EditOutlined } from '@ant-design/icons';
import { connect,Link } from 'umi';
const { Search } = Input;
import { AudioOutlined } from '@ant-design/icons';



//这是浮窗内容
const content = (
  <div>
    <p>对不起，您没有该群组权限，如想加入，</p>
    <p>请联系该群组管理员</p>
  </div>
);
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);
const onSearch = value => console.log(value);
//这是表格的样式
const columns = [
    {
      title: '名称',
      dataIndex: 'groupName',
      key: 'groupName',
      render: (text,record) => {
        const {isInGroup}=record;
        if(isInGroup==1){
          return(
            <>
            <Link to="/groupmember?groupname={text}">{text}</Link>
            </>
          )
        }
        else{
          return(
            <>
            <Popover content={content} placement="topLeft" arrowPointAtCenter >
            <a disabled>{text}</a>
            </Popover>
            </>
          )
        }
      }
      ,
    },
    {
      title: '简介',
      dataIndex: 'info',
      key: 'info',
    },
    {
      title: '群组管理员',
      dataIndex: 'groupAdmin',
      key: 'groupAdmin',
    },
    {
      title: '成员数',
      key: 'groupSize',
      dataIndex: 'groupSize',
      render: (text,record) => {
        const {isInGroup}=record;
        if(isInGroup==1){
          return(
            <>
            <Link to="/groupmember?groupname={text}">{text}</Link>
            </>
          )
        }
        else{
          return(
            <>
            <Popover content={content} placement="topLeft" arrowPointAtCenter >
            <a disabled>{text}</a>
            </Popover>
            </>
          )
        }
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime'
    },
    {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
        render: (text,record) => {
          const {isInGroup}=record;
          if(isInGroup==1){
            return(
              <Link to="/groupmember?groupname={text}"> 
              <Button  icon={<EditOutlined />}/>
              </Link>
                  )
              }
          else{
            return(
              <Link to="/groupmember?groupname={text}"> 
              <Button disabled icon={<EditOutlined />}/>
              </Link>
                  )
              }
        },
      },];



//这是tab的样式，这个callback函数还不知道啥意思
const GroupList=(props) => {
  console.log(props);
  const { groupModel, dispatch } = props;
  const { grouplist } = groupModel;
  console.log(grouplist);
  const { TabPane } = Tabs;
  //这个函数根据点击tab，来确定返回的是所有群组还是已加入群组
  const onClickViewGroup=(props)=>{
  console.log(props)
    const searchType=props-1;
    console.log(searchType)
      dispatch({
         type:'groupModel/fetch',
          payload:{searchType:searchType},
          })
          }  ;
      return (
        <div>
          <PageHeader className="site-page-header" title="群组" />

              <Link to="/groupmember?groupname={text}">
                <Button type="primary">新建</Button>
              </Link>

              <Search placeholder="按名称搜索" onSearch={onSearch} style={{ width: 200 }} />


          <Tabs defaultActiveKey="1" onChange={(key) => onClickViewGroup(key - 1)}>
            <TabPane tab="已加入群组" key="1">
              <Table columns={columns} dataSource={grouplist} />
            </TabPane>
            <TabPane tab="所有群组" key="2">
              <Table columns={columns} dataSource={grouplist} />
            </TabPane>
          </Tabs>
        </div>
      );
    };

    export default connect(({ groupModel }) => ({
      groupModel,
    }))(GroupList);

