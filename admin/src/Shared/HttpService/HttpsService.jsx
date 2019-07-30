import axios from 'axios';

const ENV = {
    HOST: process.env.REACT_APP_API_ENTRYPOINT
}

const HTTP = {
  async get(path, body, currentState, domain = null) {
    // solved
    const URL = `${!domain ? ENV.HOST : domain}/${path}`;
    let headers = {
      'Content-Type': 'application/json',
    };
    return axios.get(URL, {
      headers,
    });
  },

  async post(path, body, currentState, domain = null) {
    const URL = `${!domain ? ENV.HOST : domain}/${path}`;
    let headers = {
      'Content-Type': 'application/json'
    };
    return axios({
      method: 'post',
      url: URL,
      data: JSON.stringify(body),
      timeout: 40000,
      headers,
    });
  },

  async put(path, body, currentState, domain = null) {
    const URL = `${!domain ? ENV.HOST : domain}/${path}`;
    let headers = {
      'Content-Type': 'application/json'
    };
    return axios({
      method: 'put',
      url: URL,
      data: JSON.stringify(body),
      timeout: 40000,
      headers,
    });
  },
  async delete(path, body, currentState, domain = null) {
    const URL = `${!domain ? ENV.HOST : domain}/${path}`;
    let headers = {
      'Content-Type': 'application/json'
    };
    return axios.delete(URL, {
      timeout: 40000,
      headers,
    });
  },

};

const creator = (actionType, payload = null) => ({
  type: actionType,
  payload,
});

const HttpService = (
  method,
  domain = undefined,
  path,
  actionType,
  body = null
) => (dispatch, currentState) => {
  dispatch(creator(actionType.PENDING));
  HTTP[method.toLowerCase()](path, body, currentState, domain, '')
    .then(response => dispatch(creator(actionType.SUCCESS, response.data)))
    .catch(error =>
      dispatch(
        creator(
          actionType.ERROR,
          error.response ? error.response.data.message : error.message
        )
      )
    );
};

export default HttpService;
