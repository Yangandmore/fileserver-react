import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'element-react';
import styles from './styles';
import { mainAction } from '../../redux';

class FunKeyView extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loadState: PropTypes.object.isRequired,
    clickTableNode: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  addFile = () => {
    this.inputUpload.click();
  };

  updateFile = () => {
    this.inputUpdate.click();
  };

  downloadFile = () => {
    const { clickTableNode, dispatch } = this.props;
    const {} = this.props;
    const data = [];
    for (const table of clickTableNode) {
      data.push({ fileName: table.fileName });
    }
    dispatch(mainAction.actionDownloadZip(data));
  };

  onUploadFile = (e) => {
    const file = e.target.files[0];
    this.props.dispatch(mainAction.actionUploadFile({ file: file }));
    e.target.value = '';
  };

  onUpdateFile = (e) => {
    const { clickTableNode, dispatch } = this.props;
    const file = e.target.files[0];
    dispatch(
      mainAction.actionUpdateFile({
        file: file,
        fileName: clickTableNode[0].fileName,
      }),
    );
    e.target.value = '';
  };

  deleteFile = () => {
    const { clickTableNode, dispatch } = this.props;
    const data = [];
    for (const table of clickTableNode) {
      data.push({ fileName: table.fileName });
    }
    dispatch(mainAction.actionDeleteFiles(data));
  };

  render() {
    const { loadState, clickTableNode } = this.props;
    const hasTableFiles = clickTableNode.length === 0 ? false : true;
    const hasOneFile = clickTableNode.length === 1 ? true : false;
    return (
      <Layout.Row style={styles.container}>
        <Layout.Col span="8">
          <div style={styles.btnContainer}>
            <input
              type="file"
              name="file"
              onChange={this.onUploadFile}
              style={styles.inputStyle}
              ref={(refs) => (this.inputUpload = refs)}
            />
            <input
              type="file"
              name="file"
              onChange={this.onUpdateFile}
              style={styles.inputStyle}
              ref={(refs) => (this.inputUpdate = refs)}
            />
            <Button
              type="info"
              icon="plus"
              loading={loadState.loadUploadFile}
              onClick={this.addFile}>
              ????????????
            </Button>
            <Button
              type="warning"
              icon="edit"
              disabled={!hasOneFile}
              onClick={this.updateFile}>
              ????????????
            </Button>
            <Button
              type="info"
              disabled={!hasTableFiles}
              icon="document"
              onClick={this.downloadFile}>
              ????????????
            </Button>
          </div>
        </Layout.Col>
        <Layout.Col span="8">
          <div style={styles.btnContainer}>
            <Button
              type="danger"
              icon="delete"
              loading={loadState.loadDeleteFiles}
              disabled={!hasTableFiles}
              onClick={this.deleteFile}>
              ????????????
            </Button>
          </div>
        </Layout.Col>
      </Layout.Row>
    );
  }
}
export default FunKeyView;
