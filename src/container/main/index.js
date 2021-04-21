import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { Layout, Message, Loading } from 'element-react';
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
      fullLoading: false,
      loadState: {
        loadTree: false,
        loadUploadFile: false,
        loadDeleteFiles: false,
        loadDeleteDir: false,
        loadUpdateFile: false,
      },
    };
  }

  componentDidMount() {
    // 加载文件树
    this.props.dispatch(mainAction.actionListTree());
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { loadState } = prevState;
    const {
      loadTree,
      loadUploadFile,
      loadDeleteFiles,
      loadDeleteDir,
      loadUpdateFile,
    } = nextProps;
    let res = fromJS(prevState);
    if (loadState.loadTree !== loadTree.isFetching) {
      res = res.updateIn(['loadState', 'loadTree'], () => {
        return loadTree.isFetching;
      });
      res = res.update('fullLoading', () => {
        return loadTree.isFetching;
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
      res = res.updateIn(['loadState', 'loadUploadFile'], () => {
        return loadUploadFile.isFetching;
      });
      if (loadState.loadUploadFile && !loadUploadFile.isFetching) {
        if (loadUploadFile.error) {
          Message.error(loadUploadFile.error.errmsg);
        } else {
          Message.success(loadUploadFile.msg);
        }
      }
    }
    if (loadState.loadDeleteFiles !== loadDeleteFiles.isFetching) {
      res = res.updateIn(['loadState', 'loadDeleteFiles'], () => {
        return loadDeleteFiles.isFetching;
      });
      if (loadState.loadDeleteFiles && !loadDeleteFiles.isFetching) {
        if (loadDeleteFiles.error) {
          Message.error(loadDeleteFiles.error.errmsg);
        } else {
          Message.success(loadDeleteFiles.msg);
        }
      }
    }
    if (loadState.loadDeleteDir !== loadDeleteDir.isFetching) {
      res = res.updateIn(['loadState', 'loadDeleteDir'], () => {
        return loadDeleteDir.isFetching;
      });
      if (loadState.loadDeleteDir && !loadDeleteDir.isFetching) {
        if (loadDeleteDir.error) {
          Message.error(loadDeleteDir.error.errmsg);
        } else {
          Message.success(loadDeleteDir.msg);
        }
      }
    }
    return res.toJS();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { loadState } = this.state;
    const {
      loadUploadFile,
      loadDeleteFiles,
      loadDeleteDir,
      loadUpdateFile,
    } = prevProps;
    if (
      (!loadState.loadUploadFile && loadUploadFile.isFetching) ||
      (!loadState.loadDeleteFiles && loadDeleteFiles.isFetching) ||
      (!loadState.loadDeleteDir && loadDeleteDir.isFetching) ||
      (!loadState.loadUpdateFile && loadUpdateFile.isFetching)
    ) {
      return 1;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, data) {
    if (data === 1) {
      // 列表接口
      this.props.dispatch(mainAction.actionListTree());
    }
  }

  render() {
    const { dispatch, fileTree, clickTreeNode, clickTableNode } = this.props;
    const { fullLoading, loadState } = this.state;
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
              loadState={loadState}
              clickTreeNode={clickTreeNode}
              clickTableNode={clickTableNode}
            />
            <Tables
              dispatch={dispatch}
              fileTree={fileTree}
              clickTreeNode={clickTreeNode}
            />
          </Layout.Col>
        </Layout.Row>
        {fullLoading && <Loading fullscreen={true} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fileTree: mainSelect.fileTreeSelect(state),
  loadTree: mainSelect.loadTreeSelect(state),
  loadUploadFile: mainSelect.loadUploadFileSelect(state),
  loadDeleteFiles: mainSelect.loadDeleteFilesSelect(state),
  loadDeleteDir: mainSelect.loadDeleteDirSelect(state),
  loadUpdateFile: mainSelect.loadUpdateFileSelect(state),
  clickTreeNode: mainSelect.clickTreeNodeSelect(state),
  clickTableNode: mainSelect.clickTableNodeSelect(state),
});
export default connect(mapStateToProps)(Main);
