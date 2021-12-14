import { PageHeader,Tabs,Table,Button,Popover } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { connect } from 'umi';

//这是浮窗内容
const content = (
  <div>
    <p>对不起，您没有该群组权限，如想加入，</p>
    <p>请联系该群组管理员</p>
  </div>
);
//这是表格的样式
const columns = [
    {
      title: '名称',
      dataIndex: 'groupName',
      key: 'groupName',
      render: text => (
        <Popover content={content} placement="topLeft" arrowPointAtCenter >
        <a href="#/groupmember">{text}</a>
        </Popover>
      )
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
const GroupList=(props) => {
  console.log(props);
  const { groupModel, dispatch } = props;
  const { grouplist } = groupModel;
  console.log(grouplist);
    const { TabPane } = Tabs;
      return (
        <div>
          <PageHeader className="site-page-header" title="群组" />
          <Tabs defaultActiveKey="1" onChange={callback}>
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

