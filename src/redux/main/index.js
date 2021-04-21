import {
  createActionAsync,
  createAction,
  createReducer,
} from 'redux-act-reducer';
import { fromJS, Map, List } from 'immutable';
import { createSelector } from 'reselect';
import {
  getFileTreeApi,
  uploadFileApi,
  uploadFilesApi,
  updateFileApi,
  deleteDirApi,
  deleteFileApi,
  deleteFilesApi,
  downloadFileApi,
  downloadZipApi,
} from './api';

const defaultState = fromJS({
  fileTree: List(),
  clickTreeNode: Map(),
  clickTableNode: List(),
  loadTree: {
    isFetching: false,
    error: undefined,
  },
  loadUploadFile: {
    isFetching: false,
    error: undefined,
  },
});
const prefix = 'MAIN';
const LIST_TREE = `${prefix}_LIST_TREE`;
const CLICK_TREE_NODE = `${prefix}_CLICK_TREE_NODE`;
const CLICK_TABLE_NODE = `${prefix}_CLICK_TABLE_NODE`;
const UPLOAD_FILE = `${prefix}_UPLOAD_FILE`;
const UPLOAD_FILES = `${prefix}_UPLOAD_FILES`;
const UPDATE_FILE = `${prefix}_UPDATE_FILE`;
const DELETE_DIR = `${prefix}_DELETE_DIR`;
const DELETE_FILE = `${prefix}_DELETE_FILE`;
const DELETE_FILES = `${prefix}_DELETE_FILES`;
const DOWNLOAD_FILE = `${prefix}_DOWNLOAD_FILE`;
const DOWNLOAD_ZIP = `${prefix}_DOWNLOAD_ZIP`;

const mainAction = {};
mainAction.actionListTree = createActionAsync(LIST_TREE, getFileTreeApi);
mainAction.actionClickTreeNode = createAction(CLICK_TREE_NODE, 'nodeTreeData');
mainAction.actionClickTableNode = createAction(
  CLICK_TABLE_NODE,
  'nodeTableData',
);
mainAction.actionUploadFile = createActionAsync(UPLOAD_FILE, uploadFileApi);
mainAction.actionDeleteFile = createActionAsync(DELETE_FILE, deleteFileApi);
mainAction.actionDeleteFiles = createActionAsync(DELETE_FILES, deleteFilesApi);
mainAction.actionDeleteDir = createActionAsync(DELETE_DIR, deleteDirApi);
mainAction.actionDownloadFile = createActionAsync(
  DOWNLOAD_FILE,
  downloadFileApi,
);
mainAction.actionDownloadZip = createActionAsync(DOWNLOAD_ZIP, downloadZipApi);
mainAction.actionUpdateFile = createActionAsync(UPDATE_FILE, updateFileApi);

const select = (state) => state.get('main');
const mainSelect = {};
mainSelect.loadTreeSelect = createSelector(select, (state) => {
  return state.get('loadTree').toJS();
});
mainSelect.loadUploadFileSelect = createSelector(select, (state) => {
  return state.get('loadUploadFile').toJS();
});
mainSelect.fileTreeSelect = createSelector(select, (state) => {
  return state.get('fileTree').toJS();
});
mainSelect.clickTreeNodeSelect = createSelector(select, (state) => {
  return state.get('clickTreeNode').toJS();
});
mainSelect.clickTableNodeSelect = createSelector(select, (state) => {
  return state.get('clickTableNode').toJS();
});

const mainReducer = createReducer(
  {
    [LIST_TREE](state, action) {
      return {
        REQUEST() {
          return state.merge(
            fromJS({
              fileTree: List(),
              loadTree: {
                isFetching: true,
                error: undefined,
              },
            }),
          );
        },
        SUCCESS() {
          return state.merge(
            fromJS({
              fileTree: action.res.body.data,
              loadTree: {
                isFetching: false,
                msg: action.res.body.msg,
              },
            }),
          );
        },
        FAILURE() {
          return state.merge(
            fromJS({
              loadTree: {
                isFetching: false,
                error: action.err,
              },
            }),
          );
        },
      };
    },
    [UPLOAD_FILE](state, action) {
      return {
        REQUEST() {
          return state.merge(
            fromJS({
              loadUploadFile: {
                isFetching: true,
                error: undefined,
              },
            }),
          );
        },
        SUCCESS() {
          return state.merge(
            fromJS({
              loadUploadFile: {
                isFetching: false,
                msg: action.res.body.msg,
              },
            }),
          );
        },
        FAILURE() {
          return state.merge(
            fromJS({
              loadUploadFile: {
                isFetching: false,
                error: action.err,
              },
            }),
          );
        },
      };
    },
    [DELETE_FILE](state, action) {
      return {
        REQUEST() {
          return state.merge({});
        },
        SUCCESS() {
          return state.merge({});
        },
        FAILURE() {
          return state.merge({});
        },
      };
    },
    [DELETE_FILES](state, action) {
      return {
        REQUEST() {
          return state.merge({});
        },
        SUCCESS() {
          return state.merge({});
        },
        FAILURE() {
          return state.merge({});
        },
      };
    },
    [DELETE_DIR](state, action) {
      return {
        REQUEST() {
          return state.merge({});
        },
        SUCCESS() {
          return state.merge({});
        },
        FAILURE() {
          return state.merge({});
        },
      };
    },
    [CLICK_TREE_NODE](state, action) {
      return state.merge(
        fromJS({
          clickTreeNode: action.nodeTreeData,
        }),
      );
    },
    [CLICK_TABLE_NODE](state, action) {
      return state.merge(
        fromJS({
          clickTableNode: action.nodeTableData,
        }),
      );
    },
  },
  defaultState,
);

export { mainAction, mainReducer, mainSelect };
