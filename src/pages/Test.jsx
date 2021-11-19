import { Button, Result, Card, Table, Upload, Form, Input, Row, Divider, message } from 'antd';
import React, { Component } from 'react';
import { history, connect } from 'umi';
import ProTable from '@ant-design/pro-table';
import { UploadOutlined } from '@ant-design/icons';


const props = {
    name: 'file',
    action: '/api/file/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

class Test extends Component {


  render() {
    const { testModel, dispatch } = this.props;
    return (
      <div>
        <Card>
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Card>
      </div>);
  }
}
export default connect(({ testModel }) => ({
    testModel,
}))(Test);