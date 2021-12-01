import React from 'react';
import ProCard from '@ant-design/pro-card';
import { Button, Result, Card, Table, Modal, Form, Input, Row, Divider ,Popconfirm} from 'antd';
import { history, connect } from 'umi';
import PropTypes from 'prop-types';

/*const Products = (props) => (
  <h2>List of Products</h2>
);*/
const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
          <Button>Delete</Button>
        </Popconfirm>
      );
    },
  }];
  return (
    <Table
      dataSource={products}
      columns={columns}
    />
  );
};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

var card = [{ name: 'dva', id: 1 },{ name: 'antd', id: 2 }]


const DocCard = ({dispatch, card}) => {
  function handleDelete(id){
    dispatch({
      type: 'card/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={card} />
    </div>
    
  );
}

export default connect(({card}) => ({
  card,
}))(DocCard);

    /*<>
      <ProCard style={{ marginTop: 8 }} gutter={[16, 16]} wrap title="例子">
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="center" bordered>
          <Button onClick={addone}>+1s</Button>
        </ProCard>
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="center" bordered>
          <Button onClick={minusone}>-1s</Button>
        </ProCard>
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="center" bordered>
          Col
        </ProCard>
        <ProCard colSpan={{ xs: 24, sm: 12, md: 12, lg: 12, xl: 12 }} layout="center" bordered>
          Col
        </ProCard>
      </ProCard>
    </>*/