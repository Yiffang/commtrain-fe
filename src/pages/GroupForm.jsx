import {Button, Result, Card, Table, Modal, Form, Input, Row, Divider, Upload, PageHeader} from 'antd';
import React, { Component } from 'react';
import { history, connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import {AlertFilled, UploadOutlined} from "@ant-design/icons";

const columns = [{
  title:'账号',
  dataIndex:'loginName',
  key: 'loginName',
}, {
  title: '昵称',
  dataIndex: 'realName',
  key: 'realName',
}]

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

// 新建按钮样式
const btnLayout = {
  'padding-left':'25%',
  'padding-bottom':'24px'
}

//右侧图形
const imgDiv ={
  display:'inline-block',
  margin:'0 auto',
  'text-align':'center'
}

const imaStyle ={
  height:'342px',
  'background-repeat': 'no-repeat',
  'padding-left':'20%'
}


class UserList extends Component {

  //新建用户组
  onClickAddGrp=()=>{
    var GrpName = document.getElementById("GrpName").value;
    var GrpIntro = document.getElementById("GrpIntro").value;
    //以下1行记得删除（测试用）
    alert("群组名称："+GrpName+", 群组简介："+GrpIntro);
    if(GrpName==null || GrpName==""){
      alert("请输入群组名称");
    }
    const {dispatch} = this.props;
    dispatch({
      type:'userModel/addUser', 
      payload:{GrpName  :  name,
               GrpIntro :  description},
    })
  }

  //返回首页，根据需求返回页面路径
  onClickBack=()=>{
    
  }

  render() {
    return (
      <div>
        <PageHeader className="site-page-header" title="新建群组" />
        <Card>
          <div className={'ant-col ant-col-11'} style={{width:'40%',display:'inline-block'}} >
            <Form name="basic" layout="horizontal" {...layout}>
              <Form.Item label="群组名称:" name="groupName" >
                <Input type="text" id="GrpName" name="GrpName" placeholder="请输入群组名称（必填）"/>
              </Form.Item>
              <Form.Item label="群组简介：" name="remark" >
                <Input type="TextArea" id="GrpIntro" name="GrpIntro" placeholder="请输入群组简介（选填）"/>
              </Form.Item>
              <Form.Item label="头像" name="icon" >
                <Upload >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <br/>
              <br/><br/><br/><br/><br/><br/>
              
              <Form.Item style={btnLayout}>
                <Button type="primary"  onClick={this.onClickAddGrp}>
                  新建
                </Button>

                <Button type="primary"  onClick={this.onClickBack} style={{'margin-right':'20%'}}>
                  返回
                </Button>
              </Form.Item>
            </Form>
            {/*<Divider/>*/}
          </div>
          <div style={{width: '1px',hight:'100%','padding-bottom':'24px','padding-top':'342px','margin-left':'24px', background: 'darkgray',display:'inline-block'}}>&nbsp;</div>
          <div style={imgDiv}  layout="horizontal" >
            <div>
              <img src={require('./group.png')} style={imaStyle} alt="图片" />
            </div>
            <div className="ant-col" style={{'padding-left':'20%'}}>
              <span >群组可用于兴趣小组、知识门户和官方文档等分享与交流场景</span>
            </div>


          </div>

        </Card>

      </div>
    );
  }
}

export default connect(({ userModel }) => ({
  userModel,
}))(UserList);