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
    this.state = {
      loadState: {
        loadTree: false,
        loadUploadFile: false,
      },
    };
  }

  componentDidMount() {
    // 加载文件树
    this.props.dispatch(mainAction.actionListTree());
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { loadState } = prevState;
    const { loadTree, loadUploadFile } = nextProps;
    let res = {};
    if (loadState.loadTree !== loadTree.isFetching) {
      res = Object.assign({}, res, {
        loadState: { loadTree: loadTree.isFetching },
      });
      if (loadState.loadTree && !loadTree.isFetching) {
        if (loadTree.error) {
          Message.error(loadTree.error.errmsg);
        } else {
          Message.success(loadTree.msg);
        }
      }
    }
    if (loadState.loadUploadFile !== loadUploadFile.isFetching) {
      res = Object.assign({}, res, {
        loadState: { loadUploadFile: loadUploadFile.isFetching },
      });
      if (loadState.loadUploadFile && !loadUploadFile.isFetching) {
        if (loadUploadFile.error) {
          Message.error(loadUploadFile.error.errmsg);
        } else {
          Message.success(loadUploadFile.msg);
        }
      }
    }
    return res;
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
  loadUploadFile: mainSelect.loadUploadFileSelect(state),
  clickTreeNode: mainSelect.clickTreeNodeSelect(state),
  clickTableNode: mainSelect.clickTableNodeSelect(state),
});
export default connect(mapStateToProps)(Main);
