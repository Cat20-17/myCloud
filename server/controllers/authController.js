const {validationResult} = require('express-validator');
const {createUser, findUser, checkPassword} = require('../ services/userService');
const ResponseBuilder = require('../utilities/responseBuilder');
const createJWT = require('../utilities/createJWT');
const createResponseData = require('../utilities/createResponseData');

exports.register = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {

      const responseData = createResponseData(res, 400, 'validation error', {}, validationErrors.array());
      return ResponseBuilder.error(responseData);
    }

    const { userName, email, password } = req.body;
    const candidate = await findUser(email);
    if (candidate) {
      const responseData = createResponseData(res, 400, 'User already exists');
      return ResponseBuilder.error(responseData);
    }

    await createUser({userName, email, password});
    const responseData = createResponseData(res, 201, 'User registered');
    return ResponseBuilder.success(responseData);

  } catch (error) {
    next(error);
  }
}

exports.login = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const responseData = createResponseData(res, 400, 'validation error', {}, validationErrors.array());
      return ResponseBuilder.error(responseData);
    }

    const {email, password} = req.body;
    const user = await findUser(email);

    if (!user) {
      const responseData = createResponseData(res, 400, 'User not found');
      return ResponseBuilder.error(responseData);
    }

    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
      const responseData = createResponseData(res, 400, 'Invalid password');
      return ResponseBuilder.error(responseData);
    }

    const jwtPayload = {userId: user.id};
    const token = createJWT(jwtPayload);
    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    const responseData = createResponseData(res, 200, 'User logged in',
      {'Authorization': `Bearer ${token}`},
      userWithoutPassword);
    return ResponseBuilder.success(responseData);
  }
  catch (error) {
    next(error);
  }
}