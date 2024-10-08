import axiosInstance from './axiosConfig';

class ApiClient {
  static async request(method, url, data = null, config = {}) {
    try {
      let response;

      if (method === 'post' || method === 'put') {
        response = await axiosInstance[method](url, data, config);
      } else {
        response = await axiosInstance[method](url, config);
      }
      return response;

    } catch (error) {
        this.#handleError(error);
    }
  }

  static async get(url, config = {}) {
    return this.request('get', url, null, config);
  }

  static async post(url, data, config = {}) {
    return this.request('post', url, data, config);
  }

  static async put(url, data, config = {}) {
    return this.request('put', url, data, config);
  }

  static async delete(url, config = {}) {
    return this.request('delete', url, null, config);
  }

  static #handleError(error) {
    const errorMessage = error.response?.data?.message;
    console.error(`Error ${error.response.status}: ${errorMessage}`);
    throw new Error(errorMessage || 'Unknown error occurred');
  }
}

export default ApiClient;