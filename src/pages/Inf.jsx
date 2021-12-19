import { Table, Card, Tag, Space, PageHeader, Divider, Input, Button, Form, Checkbox, Row, Col } from 'antd';



export default () => {
    return <div>
     <Card>
      <Row>
        <PageHeader
             className="site-page-header"
             title="账户管理"
        />
      </Row>
      <Divider orientation="left"></Divider>
         <PageHeader
             className="site-page-header"
             title="联系方式："
             subTitle="你当前的账户安全系数较低，请补充绑定信息！"
         /> 
      <Row>
         <Col span={10} offset={1}>
             <Input.Group compact="false">
             <Input style={{ width: 'calc(100% - 200px)' }} placeholder="请输入电话" />
             </Input.Group>
             <Button type="primary" style={{marginTop:'10px'}}>提交</Button>
         </Col>
      </Row>
      <PageHeader
             className="site-page-header"
             title="邮箱："
             subTitle="你当前的账户安全系数较低，请补充绑定信息！"
      />
      <Row>
          <Col span={10} offset={1}>
             <Input.Group compact="false">
             <Input style={{ width: 'calc(100% - 200px)' }} placeholder="请输入邮箱" />
             </Input.Group>
             <Button type="primary" style={{marginTop:'10px'}}>提交</Button>
          </Col>
      </Row>
      <PageHeader
             className="site-page-header"
             title="修改密码："
      />
      <Row>
          <Col span={10} offset={1}>
             <Input.Group compact="false">
             <Input style={{ width: 'calc(100% - 200px)' }} placeholder="请输入新密码" />
             </Input.Group>
          </Col>
      </Row>
      <Row>
           <Col span={10} offset={1}>
             <Input.Group compact="false">
             <Input style={{ width: 'calc(100% - 200px)',marginTop:'5px' }} placeholder="请再次输入新密码" />
             </Input.Group>
           </Col>
      </Row>
      <Row>
           <Col span={10} offset={1}>
             <Button type="primary" htmlType="submit" style={{marginTop:'10px'}}>
               提交
             </Button>
           </Col>
      </Row>
     </Card>
    </div>;
  };