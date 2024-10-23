class ResponseBuilder {
  static #createResponse(res, statusCode, responseBody, headers, cookies) {
    cookies && cookies.forEach(({name, value, options}) => {
      res.cookie(name, value, options);
    });

    headers && Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.status(statusCode).json(responseBody);
  }

  static success({res, statusCode, message, data, headers, cookies}) {
    const responseBody = Object.assign(
      { status: 'success', message },
      data && { data }
    );
    return this.#createResponse(res, statusCode, responseBody, headers, cookies);
  }

  static error({res, statusCode, message, data, headers}) {
    const responseBody = Object.assign(
      { status: 'error', message },
      data && { data }
    );

    return this.#createResponse(res, statusCode, responseBody, headers);
  }
}

module.exports = ResponseBuilder;
