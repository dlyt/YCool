const request = {};

const prefix = 'http://localhost:5000'

request.get = (url, params, token = '') => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  };
  url = `${prefix}${url}`;
  if (params) {
    const paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
    if (url.search(/\?/) === -1) {
      url += `?${paramsArray.join('&')}`;
    } else {
      url += `&${paramsArray.join('&')}`;
    }
  }
  url = encodeURI(url);

  return new Promise((resolve, reject) => {
    fetch(url, options)
    .then(
      (response) => {
        if (response.ok) {
          return response.json();
        }
        return reject({ status: response.status });
      }).then((response) => {
        resolve(response);
      }).catch((err) => {
        reject({ status: -1, msg: err.message });
      });
  });
};

request.post = (url, data, token = '') => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  };
  url = `${prefix}${url}`;
  url = encodeURI(url);
  return new Promise((resolve, reject) => {
    fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return reject({ status: response.status });
    }).then((response) => {
      resolve(response);
    }).catch((err) => {
      reject({ status: -1, msg: err.message });
    });
  });
};

export default request;
