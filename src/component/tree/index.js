import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Input } from 'element-react';
import { mainAction } from '../../redux';
import styles from './styles';

class Trees extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    fileTree: PropTypes.array.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      fileTree: [],
      options: {
        label: 'fileName',
        children: 'files',
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let res = {};

    if (nextProps.fileTree) {
      if (
        JSON.stringify(prevState.fileTree) !==
        JSON.stringify(nextProps.fileTree)
      ) {
        res = Object.assign({}, res, { fileTree: nextProps.fileTree });
      }
    } else if (prevState.fileTree.length !== 0) {
      res = Object.assign({}, res, { fileTree: [] });
    }
    return res;
  }

  renderContent = (nodeModel, data, store) => {
    return data.files != null ? (
      <span>
        <span>{data.fileName}</span>
        <span style={styles.itemLength}>{`${data.files.length} files`}</span>
      </span>
    ) : (
      <span>
        <span>{data.fileName}</span>
      </span>
    );
  };

  nodeClick = (data) => {
    this.props.dispatch(mainAction.actionClickTreeNode(data));
  };

  render() {
    const { fileTree, options } = this.state;
    const tableHeight = window.innerHeight - 64 - 2;
    return (
      <div style={{ height: tableHeight }}>
        <Input
          placeholder="请输入关键字过滤"
          onChange={(text) => this.tree.filter(text)}
        />
        <Tree
          ref={(refs) => (this.tree = refs)}
          className="filter-tree"
          nodeKey="fileName"
          data={fileTree}
          highlightCurrent="true"
          renderContent={(...args) => this.renderContent(...args)}
          options={options}
          onNodeClicked={(data) => {
            let d = {};
            if (data.files) {
              // 文件夹
              d = { fileName: data.fileName, files: data.files };
            } else {
              // 文件
              d = {
                fileName: data.fileName,
                fileSize: data.fileSize,
                filePath: data.filePath,
              };
            }
            this.nodeClick(d);
          }}
          filterNodeMethod={(value, data) => {
            if (!value) {
              return true;
            }
            return data.fileName.indexOf(value) !== -1;
          }}
        />
      </div>
    );
  }
}
export default Trees;
