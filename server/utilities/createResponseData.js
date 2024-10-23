function createResponseData(res, statusCode, message, headers = null, data = null, cookies = null) {
  return { res, statusCode, message, headers, data, cookies};
}

module.exports = createResponseData;