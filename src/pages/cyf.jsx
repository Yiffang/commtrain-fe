import React,{Component} from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined,ShareAltOutlined,ProjectOutlined } from '@ant-design/icons';
import { Alert, Avatar, Icons, Button, Space, List, Result, Card, Table, Modal, Form, Input, Row, Col, Divider ,Popconfirm, Layout, Menu, PageHeader} from 'antd';
import { history, connect } from 'umi';

import PropTypes from 'prop-types';
import { isFunctionOrConstructorTypeNode, isTemplateMiddleOrTemplateTail } from 'typescript';
import copy from 'copy-to-clipboard';
import docModel from '@/models/docModel';

const { Sider, Content } = Layout;
const {SubMenu} = Menu;

class DocPage extends Component {
  //表单内容修改
  onChangeField = (name,e) => {
    const {dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload: {
        [name]: e.target.value,
      }
    })
  }
  //点击新建文件夹，设置弹窗可见
  onClickCreateFolder = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload:{
        createFolderVisible:true,
      }
    })
  }
  //确认创建新文件夹
  createFolderVisibleOk = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/createFolderVisibleOk',
      payload:{
        
      }
    })
  }
  //关闭新建文件夹弹窗
  createFolderVisibleCancel = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload:{
        createFolderVisible:false,
      }
    })
  }
  //点击新建文档，设置弹窗可见
  onClickCreateDoc = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload:{
        createDocVisible:true,
      }
    })
  }
  //确认创建新文档
  createDocVisibleOk = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/createDocVisibleOk',
      payload:{
        
      }
    })
  }
  //关闭新建文档弹窗
  createDocVisibleCancel = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload:{
        createDocVisible:false,
      }
    })
  }
  //点击编辑文件夹，设置弹窗可见
  onClickEditFolder = (id,name) => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload:{
        editfoldername:name,
        editfolderid:id,
        editFolderVisible:true
      }
    })
  }
  //确认编辑新文件夹
  editFolderVisibleOk = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/editFolderVisibleOk',
      payload:{
        
      }
    })
  }
  //关闭编辑文件夹弹窗
  editFolderVisibleCancel = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload:{
        editFolderVisible:false,
      }
    })
  }
  //关闭警告弹窗
  AlertVisibleCancel = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload:{
        AlertVisible:false,
      }
    })
  }
  //删除文件夹
  ondeleteFolder = (id) => {
    const {dispatch} = this.props;
    dispatch({
      type:'docModel/deleteFolder',
      payload: {
        id,
      }
    })
  }
  //文档列表页码
  onChangePage =(pageNo, pageSize)=>{
    const {dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload:{
        pageNo,
        pageSize
      }
    })
    dispatch({
      type: 'docModel/fetchDoc',
      payload: {
        pageNo, 
        pageSize
      }
    })
  }
  //打开文档列表
  onClickOpenFolder = (id) => {
    console.log('click ' + id);
    const {dispatch} = this.props;
    dispatch({
      type: 'docModel/changeState',
      payload:{
        remotefolderid: id,
        flag_folderchange: true,
      }
    })
    dispatch({
      type: 'docModel/reloadDoc',
      payload:{

      }
    })
  }
  //文档详情查看
  onClickDetaildoc = (id) => {
    console.log('detail:',id);
  }
  //文档编辑
  onClickEditdoc = (id) => {
    console.log('edit:',id);
  }
  //文档删除
  onClickDeletedoc = (id) => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/deleteDoc',
      payload:{
        id,
      }
    })
  }
  //文档分享
  onClickSharedoc = (id) => {
    const{dispatch} = this.props;
    const{project_code,remotefolderid} = this.props.docModel;
    dispatch({
      type:'docModel/changeState',
      payload:{
        shareDocVisible:true,
        shareContent:location.toString()+"?project_code="+project_code.toString()+"&folder_id="+remotefolderid.toString()+"&doc_id="+id.toString(),
      }
    })
  }
  //文档分享取消
  shareDocVisibleCancel = () => {
    const{dispatch} = this.props;
    dispatch({
      type:'docModel/changeState',
      payload:{
        shareDocVisible:false,
      }
    })
  }
  //复制到剪贴板
  CopyText = () =>{
    copy(this.props.docModel.shareContent);
  }
  //菜单各项显示
  renderMenuItem = (item) => {
    return(
      <Menu.Item key={"FOLDER:"+item.folder_id}>
        <Row>
          <Col flex="6">{item.folder_name}</Col>
          <Col flex="2"><a onClick={this.onClickOpenFolder.bind(this,item.folder_id)}><SearchOutlined/></a></Col>
          <Col flex="2"><Popconfirm title="确认删除此文件夹?" onConfirm={this.ondeleteFolder.bind(this,item.folder_id)}>
              <a><DeleteOutlined/></a>
            </Popconfirm></Col>
          <Col flex="2"><a onClick={this.onClickEditFolder.bind(this,item.folder_id,item.folder_name)}><EditOutlined/></a></Col>
        </Row>
      </Menu.Item>
    )
  }

  render(){
    //文档列表
    const columns = [{
      title:'序号',
      dataIndex:'doc_id',
      key: 'doc_id',
      align: 'center',
    }, {
      title: '文档名称',
      dataIndex: 'doc_name',
      key: 'doc_name',
      align: 'center',
    }, {
      title: '创建者',
      dataIndex: 'doc_creator',
      key: 'doc_creator',
      align: 'center',
    }, {
      title: '文档备注',
      dataIndex: 'doc_remark',
      key: 'doc_remark',
      align: 'center',
    }, {
      title: '操作',
      dataIndex: 'doc_action',
      key: 'doc_action',
      align: 'center',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={this.onClickDetaildoc.bind(this,record.doc_id)}><SearchOutlined /></a>
          <a onClick={this.onClickEditdoc.bind(this,record.doc_id)}><EditOutlined /></a>
          <Popconfirm title="确认删除此文档?" onConfirm={this.onClickDeletedoc.bind(this,record.doc_id)}>
              <a><DeleteOutlined/></a>
          </Popconfirm>          
          <a onClick={this.onClickSharedoc.bind(this,record.doc_id)}><ShareAltOutlined /></a>
        </Space>
      ),
    },]
    
    const {docModel,dispatch} = this.props;
    const {doclist,AlertVisible,alertmessage,
      createFolderVisible,editFolderVisible,editfoldername,editfolderid,
      addfoldername,project_code,project_name,folderlist,remotefolderid,
      createDocVisible,editDocVisible,showDocVisible,shareDocVisible,shareContent,
      adddocname,adddocremark,
      editdocname,editdocremark,
      pageNo,pageSize,totalCount} = docModel;

    return (
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-around" align="left">
        <Col flex={2} justify="start">
          <Button type="default" style={{width:'100%',backgroundColor:'white'}} onClick={this.onClickCreateFolder}>
            +新建文件夹
          </Button>
          <Menu
            style={{ width: '100%' }}
            defaultSelectedKeys={['project-1']}
            defaultOpenKeys={['project-1']}
            mode={'inline'}
            theme={'light'}
          >
          <SubMenu key="project-1" icon={<ProjectOutlined />} title={project_name}>
            {folderlist.map((item=>this.renderMenuItem(item)))}
          </SubMenu>  
          </Menu>
          
          <Modal
            visible={createFolderVisible}
            title="新建文件夹"
            onOk={this.createFolderVisibleOk}
            onCancel={this.createFolderVisibleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.createFolderVisibleOk}>
                确定
              </Button>,
              <Button key="back" onClick={this.createFolderVisibleCancel}>
                取消
              </Button>,
            ]}
          >
            <p>新建文件夹</p>
            <Input placeholder="文件夹名称（必填）" value={addfoldername} addonBefore="文件夹名称*" addonAfter="" onChange={this.onChangeField.bind(this,'addfoldername')}/>
          </Modal>
          <Modal
            visible={editFolderVisible}
            title="编辑文件夹"
            onOk={this.editFolderVisibleOk}
            onCancel={this.editFolderVisibleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.editFolderVisibleOk}>
                确定
              </Button>,
              <Button key="back" onClick={this.editFolderVisibleCancel}>
                取消
              </Button>,
            ]}
          >
            <p>编辑文件夹</p>
            <Input value={editfoldername} addonBefore="文件夹名称*" addonAfter="" onChange={this.onChangeField.bind(this,'editfoldername')}/>
          </Modal>
          <Modal
            visible={AlertVisible}
            title="警告"
            onOk={this.AlertVisibleCancel}
            onCancel={this.AlertVisibleCancel}
            footer={[
              <Button key="submit" type="primary" onClick={this.AlertVisibleCancel}>
                确定
              </Button>,
            ]}
          >
            <Alert
              message="Warning"
              description={alertmessage}
              type="warning"
              showIcon
              closable
            />
          </Modal>
        </Col>
        <Col flex={8}>
          <Card>
            <Button type="default" style={{backgroundColor:'white'}} onClick={this.onClickCreateDoc}>
              +新建文档
            </Button>
            <p>当前文件夹ID:{remotefolderid}</p>
            <Table columns={columns} dataSource={doclist} rowKey="doc_id" pagination={{
              current: pageNo,
              total: totalCount,
              pageSize: pageSize,
              onChange: this.onChangePage
            }}/>
            <Modal
              visible={createDocVisible}
              title="新建文档"
              onOk={this.createDocVisibleOk}
              onCancel={this.createDocVisibleCancel}
              footer={[
                <Button key="submit" type="primary" onClick={this.createDocVisibleOk}>
                  确定
                </Button>,
                <Button key="back" onClick={this.createDocVisibleCancel}>
                  取消
                </Button>,
              ]}
            >
              <p>新建文档</p>
              <Input placeholder="文档描述（必填）" value={adddocname} addonBefore="文档名称*" addonAfter="" onChange={this.onChangeField.bind(this,'adddocname')}/>
              <Input placeholder="文档备注（选填）" value={adddocremark} addonBefore="文档备注*" addonAfter="" onChange={this.onChangeField.bind(this,'adddocremark')}/>
            </Modal>
            <Modal
              visible={shareDocVisible}
              title="分享文档"
              onCancel={this.shareDocVisibleCancel}
              footer={[
                <Button key="back" onClick={this.shareDocVisibleCancel}>
                  取消
                </Button>,
              ]}
            >
              <Input value={shareContent} disabled={true}/>
              <Button type="primary" style={{marginTop:10}} onClick={this.CopyText}>复制</Button>
            </Modal>
          </Card>
        </Col>
      </Row>
    );
  }

}

export default connect(({ docModel }) => ({
  docModel,
}))(DocPage);
