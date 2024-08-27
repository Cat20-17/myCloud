const createResponseData = require("../utilities/createResponseData");
const ResponseBuilder = require("../utilities/responseBuilder");

function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const responseData = createResponseData(res, 500, 'Internal Server Error');
  return ResponseBuilder.error(responseData);
}

module.exports = errorHandler;