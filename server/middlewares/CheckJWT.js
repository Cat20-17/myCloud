const jwt = require('jsonwebtoken');
const createResponseData = require('../utilities/createResponseData');
const ResponseBuilder = require('../utilities/responseBuilder');

class CheckJWT {
  static checkAuthToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      const responseData = createResponseData(res, 401, 'Not authorized');
      return ResponseBuilder.error(responseData);
    }

    const SECRET_KEY = process.env.ACCESS_SECRET_KEY;

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        const responseData = createResponseData(res, 401, 'Not authorized');
        return ResponseBuilder.error(responseData);
      }
      req.userId = decoded.userId;
      next();
    });
  }
  static checkRefreshToken(req, res, next) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      const responseData = createResponseData(res, 419, 'No refresh token');
      return ResponseBuilder.error(responseData);
    }

    const SECRET_KEY = process.env.REFRESH_SECRET_KEY;

    jwt.verify(refreshToken, SECRET_KEY, (err, decoded) => {
      if (err) {
        const responseData = createResponseData(res, 419, 'Invalid refresh token');
        return ResponseBuilder.error(responseData);
      }
      req.userId = decoded.userId;
      next();
    });
  }
}

module.exports = CheckJWT;