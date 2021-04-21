import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Input, Popover, Button } from 'element-react';
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
      options: {
        label: 'fileName',
        children: 'files',
      },
    };
  }

  clickDeleteDir = (fileName) => {
    this.props.dispatch(mainAction.actionDeleteDir({ fileName: fileName }));
  };

  renderContent = (nodeModel, data, store) => {
    return (
      <span>
        <span>{data.fileName}</span>
        {data.files != null ? (
          <span style={styles.itemLength}>
            <Popover
              placement="left"
              width="150"
              trigger="hover"
              content={
                <span>
                  <Button
                    style={{ width: '100%' }}
                    type="text"
                    onClick={() => {
                      this.clickDeleteDir(data.fileName);
                    }}>
                    删除
                  </Button>
                </span>
              }>
              <Button icon="more" type="text" />
            </Popover>
          </span>
        ) : null}
      </span>
    );
  };

  nodeClick = (data) => {
    this.props.dispatch(mainAction.actionClickTreeNode(data));
  };

  render() {
    const { fileTree } = this.props;
    const { options } = this.state;
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
          highlightCurrent={true}
          renderContent={(...args) => this.renderContent(...args)}
          options={options}
          onNodeClicked={(data, node) => {
            let d = {};
            if (data.files) {
              // 文件夹
              d = { fileName: data.fileName, files: data.files };
              this.nodeClick(d);
            }
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
