function createResponseData(res, statusCode, message, headers = {}, data = null) {
  return { res, statusCode, message, headers, data};
}

module.exports = createResponseData;