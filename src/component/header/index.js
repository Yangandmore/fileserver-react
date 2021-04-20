import React from 'react';
import { Layout } from 'element-react';
import styles from './styles';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.container}>
        <Layout.Row>
          <Layout.Col span="10">
            <div style={styles.logoContainer}>
              <h1 style={styles.logoText}>File Server</h1>
            </div>
          </Layout.Col>
          <Layout.Col span="6" offset="8" />
        </Layout.Row>
      </div>
    );
  }
}
export default Header;
