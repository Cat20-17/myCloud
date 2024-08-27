class ResponseBuilder {
  static #createResponse(res, statusCode, responseBody, headers = {}) {
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.status(statusCode).json(responseBody);
  }

  static success({res, statusCode, message, data = null, headers = {}}) {
    const responseBody = Object.assign(
      { status: 'success', message },
      data && { data }
    );
    return this.#createResponse(res, statusCode, responseBody, headers);
  }

  static error({res, statusCode, message, data = null, headers = {}}) {
    const responseBody = Object.assign(
      { status: 'error', message },
      data && { data }
    );

    return this.#createResponse(res, statusCode, responseBody, headers);
  }
}

module.exports = ResponseBuilder;
