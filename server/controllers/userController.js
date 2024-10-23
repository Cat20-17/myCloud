const createResponseData = require('../utilities/createResponseData');
const ResponseBuilder = require('../utilities/responseBuilder');
const { findUser } = require('../ services/userService');

exports.getUserFiles = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await findUser({userId});

    if (user) {
      const userName = user.userName;
      const responseData = createResponseData(res, 200, `Hello ${userName}! This is your files!`);
      return ResponseBuilder.success(responseData);
    } else {
      const responseData = createResponseData(res, 404, 'Page not found');
      return ResponseBuilder.error(responseData);
    }
  } catch (error) {
    next(error);
  }
}