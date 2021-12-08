import { PageHeader,Tabs,Table,Button,Pagination } from 'antd';
import { EditOutlined } from '@ant-design/icons';

//这是表格数据
const data = [
    {
      key: '1',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
        key: '2',
        groupName: 'John Brown',
        info: 'nothing',
        groupAdmin: 'luke',
        groupSize: 44,
        createTime:'20210101',
    },
    {
        key: '3',
        groupName: 'John Brown',
        info: 'nothing',
        groupAdmin: 'luke',
        groupSize: 44,
        createTime:'20210101',
    },
    {
      key: '4',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '5',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '6',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '7',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '8',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '9',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '10',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '11',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '12',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '13',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '14',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
    {
      key: '15',
      groupName: 'John Brown',
      info: 'nothing',
      groupAdmin: 'luke',
      groupSize: 44,
      createTime:'20210101',
    },
  ];
//这是表格的样式
const columns = [
    {
      title: '名称',
      dataIndex: 'groupName',
      key: 'groupName',
      
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
        render: ()=><Button icon={<EditOutlined />} />,
      },
  ];
//这是tab的样式，这个callback函数还不知道啥意思
function callback(key) {
    console.log(key);
  }
export default () => {
    const { TabPane } = Tabs;
    return <div>
        <PageHeader
    className="site-page-header"
    title="群组"
        />
        <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="已加入群组" key="1">
                <Table columns={columns} dataSource={data} />
            </TabPane>
            <TabPane tab="所有群组" key="2">
                <Table columns={columns} dataSource={data} />
            </TabPane>
        </Tabs>
        </div>;
  };