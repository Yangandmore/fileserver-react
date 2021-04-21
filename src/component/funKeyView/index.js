import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'element-react';
import styles from './styles';
import { mainAction } from '../../redux';

class FunKeyView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    clickTreeNode: PropTypes.object.isRequired,
    clickTableNode: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasTreeNode: false,
      treeName: '',
      tables: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let res = {};
    if (nextProps.clickTreeNode && nextProps.clickTreeNode.files) {
      if (nextProps.clickTreeNode.fileName !== prevState.treeName) {
        res = Object.assign({}, res, { treeName: prevState.treeName });
      }
      res = Object.assign({}, res, { hasTreeNode: true });
    } else {
      res = Object.assign({}, res, { hasTreeNode: false, treeName: '' });
    }
    if (nextProps.clickTableNode) {
      if (
        JSON.stringify(prevState.tables) !==
        JSON.stringify(nextProps.clickTableNode)
      ) {
        res = Object.assign({}, res, { tables: nextProps.clickTableNode });
      }
    } else {
      res = Object.assign({}, res, { tables: [] });
    }
    return res;
  }

  addFile = () => {
    this.inputUpload.click();
  };

  updateFile = () => {
    this.inputUpdate.click();
  };

  downloadFile = () => {
    const { dispatch } = this.props;
    const { tables } = this.state;
    const data = [];
    for (const table of tables) {
      data.push({ fileName: table.fileName });
    }
    dispatch(mainAction.actionDownloadZip(data));
  };

  onUploadFile = (e) => {
    const file = e.target.files[0];
    this.props.dispatch(mainAction.actionUploadFile({ file: file }));
  };

  onUpdateFile = (e) => {
    const { tables } = this.state;
    const file = e.target.files[0];
    this.props.dispatch(
      mainAction.actionUpdateFile({ file: file, fileName: tables[0].fileName }),
    );
  };

  deleteFile = () => {
    const { tables } = this.state;
    const data = [];
    for (const table of tables) {
      data.push({ fileName: table.fileName });
    }
    this.props.dispatch(mainAction.actionDeleteFiles(data));
  };

  render() {
    const { hasTreeNode, tables } = this.state;
    const hasTableFiles = tables.length === 0 ? false : true;
    const hasOneFile = tables.length === 1 ? true : false;
    return (
      <Layout.Row style={styles.container}>
        <Layout.Col span="8">
          <div style={styles.btnContainer}>
            <input
              type="file"
              name="file"
              onChange={this.onUploadFile}
              style={{ display: 'none' }}
              ref={(refs) => (this.inputUpload = refs)}
            />
            <input
              type="file"
              name="file"
              onChange={this.onUpdateFile}
              style={{ display: 'none' }}
              ref={(refs) => (this.inputUpdate = refs)}
            />
            <Button type="info" icon="plus" onClick={this.addFile}>
              新增文件
            </Button>
            <Button
              type="warning"
              icon="edit"
              disabled={!hasOneFile}
              onClick={this.updateFile}>
              覆盖文件
            </Button>
            <Button
              type="info"
              disabled={!hasTableFiles}
              icon="document"
              onClick={this.downloadFile}>
              下载文件
            </Button>
          </div>
        </Layout.Col>
        <Layout.Col span="16">
          <div style={styles.btnContainer}>
            <Button
              type="danger"
              icon="delete"
              disabled={!hasTableFiles}
              onClick={this.deleteFile}>
              删除文件
            </Button>
          </div>
        </Layout.Col>
      </Layout.Row>
    );
  }
}
export default FunKeyView;
