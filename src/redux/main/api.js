import { request } from '../../utils';

// 获取文件树
const getFileTreeApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/listTree',
        method: 'GET',
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

// TODO 增加文件
const uploadFileApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/uploadFile',
        method: 'POST',
        type: 'form',
        body: param,
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

// TODO 增加多个文件
const uploadFilesApi = async (param, dispatch, getState) => {
  try {
  } catch (err) {
    return Promise.reject(err);
  }
};

// TODO 修改覆盖文件
const updateFileApi = async (param, dispatch, getState) => {
  try {
  } catch (err) {
    return Promise.reject(err);
  }
};

// 删除文件
const deleteDirApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/delete/file',
        method: 'POST',
        body: param,
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
const deleteFileApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/delete/file',
        method: 'DELETE',
        body: param,
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
const deleteFilesApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/delete/files',
        method: 'DELETE',
        body: param,
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

// 下载
const downloadFileApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/downloadFile',
        method: 'POST',
        body: param,
        type: 'file',
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};
const downloadZipApi = async (param, dispatch, getState) => {
  try {
    const res = await request(
      {
        endpoint: '/downloadZipFile',
        method: 'POST',
        body: param,
        type: 'file',
      },
      dispatch,
      getState,
    );
    return Promise.resolve(res);
  } catch (err) {
    return Promise.reject(err);
  }
};

export {
  getFileTreeApi,
  uploadFileApi,
  uploadFilesApi,
  updateFileApi,
  deleteDirApi,
  deleteFileApi,
  deleteFilesApi,
  downloadFileApi,
  downloadZipApi,
};
