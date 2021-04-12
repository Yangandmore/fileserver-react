import React from 'react';
import { connect } from 'react-redux';
import { Layout, Form, Input, Button, Loading, Message } from 'element-react';
import styles from './styles';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>main</div>;
  }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(Main);
