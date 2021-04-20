import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Layout, Message } from 'element-react';
import styles from './styles';
import { Header, Tables, Trees, FunKeyView } from '../../component';
import { mainAction, mainSelect } from '../../redux';

class Main extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // 加载文件树
    this.props.dispatch(mainAction.actionListTree());
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let res = {};

    return res;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { loadTree: newLoadTree } = prevProps;
    const { loadTree } = this.props;
    if (!loadTree.isFetching && newLoadTree.isFetching) {
      if (this.props.loadTree.error) {
        Message.error(this.props.loadTree.error.errmsg);
      } else {
        Message.success(this.props.loadTree.msg);
      }
    }
    return null;
  }

  render() {
    const { dispatch, fileTree, clickTreeNode, clickTableNode } = this.props;
    return (
      <div>
        <Header />
        <Layout.Row>
          <Layout.Col span="6">
            <Trees dispatch={dispatch} fileTree={fileTree} />
          </Layout.Col>
          <Layout.Col span="18">
            <FunKeyView
              dispatch={dispatch}
              clickTreeNode={clickTreeNode}
              clickTableNode={clickTableNode}
            />
            <Tables dispatch={dispatch} clickTreeNode={clickTreeNode} />
          </Layout.Col>
        </Layout.Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fileTree: mainSelect.fileTreeSelect(state),
  loadTree: mainSelect.loadTreeSelect(state),
  clickTreeNode: mainSelect.clickTreeNodeSelect(state),
  clickTableNode: mainSelect.clickTableNodeSelect(state),
});
export default connect(mapStateToProps)(Main);
