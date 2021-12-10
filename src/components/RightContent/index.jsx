import { Space } from 'antd';
import { Alert } from 'antd';
import { ReactDOM } from 'react-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import { render } from 'enzyme';
import { currentUser as queryCurrentUser } from '../../services/ant-design-pro/api';
import { INHERIT_KEYS } from '@babel/types';

const GlobalHeaderRight = () => {
  const { initialState } = useModel('@@initialState');
  //console.log(initialState);
  //console.log(initialState.currentUser);
  //获取用户信息
  var username = "default";
  var groupnum = 0;
  var usericon = "";
  username = initialState.currentUser['name'];
  groupnum = initialState.currentUser['group_num'];
  usericon = initialState.currentUser['user_pic_path'];

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }



  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="文档搜索"
        defaultValue="交享乐"
        options={[
          {
            label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>,
            value: 'umi ui',
          },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
          {
            label: <a href="/">交享乐</a>,
            value: '交享乐',
          },
        ]} // onSearch={value => {
        //   console.log('input', value);
        // }}
      />
      <span
        className={styles.action}
        onClick={() =>{
          window.location.replace('/fakeurlgroup');
        }}>
        <img src='/icons/icon-64x64.png'/>
        <div><font color='#ffffff'>{'群组'}{groupnum}</font></div>
      </span>
      <span
        className={styles.action}
        onClick={() =>{
          window.location.replace('/fakeurluser');
        }}>
        <img src={usericon}/>
        <div><font color='#ffffff'>{username}</font></div>
      </span>
      <span
        className={styles.action}
        onClick={() => {
          window.alert("请联系管理员XXX老师\n邮箱为XXX");
        }}>
        <QuestionCircleOutlined />
      </span>

    </Space>
  );
};

export default GlobalHeaderRight;

//<Avatar />
//<SelectLang className={styles.action} />