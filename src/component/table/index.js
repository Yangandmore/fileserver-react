import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'element-react';
import styles from './styles';
import { mainAction } from '../../redux';

class Tables extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    clickTreeNode: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      columns: [
        {
          type: 'selection',
        },
        {
          type: 'index',
        },
        {
          label: '文件名称',
          prop: 'fileName',
          width: 380,
        },
        {
          label: '大小',
          prop: 'fileSize',
          width: 180,
        },
        {
          label: '路径',
          prop: 'filePath',
        },
        {
          label: '操作',
          prop: 'func',
          width: 130,
          render: (data) => {
            return (
              <span>
                <Button
                  size="small"
                  type="info"
                  icon="upload"
                  onClick={() => {
                    this.downloadFile(data);
                  }}
                />
                <Button
                  size="small"
                  type="danger"
                  icon="delete"
                  onClick={() => {
                    this.deleteFile(data);
                  }}
                />
              </span>
            );
          },
        },
      ],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let res = {};
    if (nextProps.clickTreeNode.files) {
      // 文件夹
      if (
        JSON.stringify(prevState.files) !==
        JSON.stringify(nextProps.clickTreeNode.files)
      ) {
        res = Object.assign({}, res, { files: nextProps.clickTreeNode.files });
      }
    }

    return res;
  }

  downloadFile = (data) => {
    this.props.dispatch(
      mainAction.actionDownloadFile({
        fileName: data.fileName,
      }),
    );
  };

  deleteFile = (data) => {
    this.props.dispatch(
      mainAction.actionDeleteFile({
        fileName: data.fileName,
      }),
    );
  };

  selectChange = (selection) => {
    this.props.dispatch(mainAction.actionClickTableNode(selection));
  };

  render() {
    const { files, columns } = this.state;
    const tableHeight = window.innerHeight - 64 - 64;
    // 判断是文件还是文件夹
    return (
      <div>
        <Table
          style={styles.tableContainer}
          border={true}
          columns={columns}
          data={files}
          height={tableHeight}
          stripe={true}
          highlightCurrentRow={true}
          onSelectChange={(selection) => {
            // 多选
            this.selectChange(selection);
          }}
        />
      </div>
    );
  }
}
export default Tables;
