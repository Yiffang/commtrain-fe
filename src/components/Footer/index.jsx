import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
import styles from './index.less';


export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '交通银行金融科技部出品',
  });
  const currentYear = new Date().getFullYear();
  const copyright = 'Copyright©';
  const block = ' ';
  return (
    <footer class={styles.miniFooter}>
      <div><br/>{copyright}{currentYear}{defaultMessage}</div>
      <div><br/></div>
    </footer>
  );
};
