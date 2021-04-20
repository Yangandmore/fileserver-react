// 请求数据
const makeOptions = (url, options) => {
  const defaultoptions = {
    url: undefined,
    method: 'GET',
    qs: undefined,
    body: undefined,
    headers: undefined,
    type: 'json',
    contentType: 'application/json',
    crossOrigin: true,
    credentials: undefined,
  };

  let thisoptions = {};
  if (options) {
    thisoptions = options;
    if (url) {
      thisoptions.url = url;
    }
  } else {
    thisoptions.url = url;
  }
  thisoptions = Object.assign({}, defaultoptions, thisoptions);

  return thisoptions;
};

//
const addQs = (url, qs) => {
  let queryString = '';
  let newUrl = url;
  if (qs && typeof qs === 'object') {
    for (const k of Object.keys(qs)) {
      queryString += `&${k}=${qs[k]}`;
    }
    if (queryString.length > 0) {
      if (url.split('?').length < 2) {
        queryString = queryString.substring(1);
      } else if (url.split('?')[1].length === 0) {
        queryString = queryString.substring(1);
      }
    }

    if (url.indexOf('?') === -1) {
      newUrl = `${url}?${queryString}`;
    } else {
      newUrl = `${url}${queryString}`;
    }
  }

  return newUrl;
};

//
const parseJSON = (response) =>
  response.text().then((text) => {
    let rtn = {};
    if (text) {
      rtn = JSON.parse(text);
    }
    return rtn;
  });

// 网络请求
const request = ({ url, ...options }) => {
  const opts = makeOptions(url, options);
  const { method, credentials, qs, type, mode } = opts;
  let { body, headers } = opts;
  let requestUrl = opts.url;
  requestUrl = addQs(requestUrl, qs);

  switch (type.toLowerCase()) {
    case 'json':
      body = JSON.stringify(body);
      if (
        method.toLowerCase() === 'post' ||
        method.toLowerCase() === 'put' ||
        method.toLowerCase() === 'delete'
      ) {
        headers = Object.assign({}, headers, {
          'Content-Type': 'application/json',
        });
      }
      break;
    case 'form':
      // 数据封装成fromData
      let formData = new FormData();
      for (var key in body) {
        formData.append(key, body[key]);
      }
      body = formData;
      break;
    case 'file':
      body = JSON.stringify(body);
      if (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') {
        headers = Object.assign({}, headers, {
          'Content-Type': 'application/json',
        });
      }
      break;
    default:
      break;
  }

  return new Promise((resolve, reject) => {
    /* global fetch:false */
    fetch(requestUrl, {
      method,
      headers,
      body,
      credentials,
      mode,
    })
      .then((response) => {
        let data = {};
        if (response.status !== 204) {
          switch (type.toLowerCase()) {
            case 'html':
            case 'text':
              data = response.text();
              break;
            case 'json':
              data = parseJSON(response);
              break;
            case 'form':
              data = parseJSON(response);
              break;
            case 'jpg':
            case 'png':
            case 'gif':
            case 'img':
              data = response.blob();
              break;
            case 'file':
              // 下载文件
              let name = 'document';
              if (
                response.headers.has('content-disposition') &&
                response.headers.get('content-disposition').split(';').length >
                  1 &&
                response.headers
                  .get('content-disposition')
                  .split(';')[1]
                  .split('=').length > 1
              ) {
                const fileName = response.headers
                  .get('content-disposition')
                  .split(';')[1]
                  .split('=')[1];
                name = decodeURIComponent(fileName);
              }
              response.blob().then((blob) => {
                const link = document.createElement('a');
                link.style.display = 'none';
                link.download = name;
                link.href = URL.createObjectURL(blob);
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(link.href);
                document.body.removeChild(link);
              });
              data = { msg: '下载成功', fileName: name };
              break;
            default:
              data = response.text();
              break;
          }
        }
        return data;
      })
      .then(async (data) => {
        if (type === 'file') {
          resolve({ body: data });
          return;
        }
        if (data.status === 0) {
          // 正确请求
          resolve({ body: data, parameter: opts.body });
        } else if (data.status >= 500 && data.status <= 600) {
          let err = {
            errcode: data.status,
            errmsg: data.msg,
          };
          reject(err);
        } else {
          let err = {
            errcode: data.status,
            errmsg: data.err,
          };
          reject(err);
        }
      })
      .catch((err) => reject({ errcode: -1, errmsg: `${err}` }));
  });
};

export default request;
