const {validationResult} = require('express-validator');
const {createUser, findUser, checkPassword} = require('../ services/userService');
const createResponseData = require('../utilities/createResponseData');
const ResponseBuilder = require('../utilities/responseBuilder');
const CreateJWT = require('../utilities/createJWT');
const CheckJWT = require('../middlewares/CheckJWT');

exports.register = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {

      const responseData = createResponseData(res, 400, 'validation error', {}, validationErrors.array());
      return ResponseBuilder.error(responseData);
    }

    const { userName, email, password } = req.body;
    const candidate = await findUser({email});
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
    const user = await findUser({email});

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
    const  authToken = CreateJWT.access(jwtPayload);
    const  refreshToken = CreateJWT.refresh(jwtPayload);
    const cookies = [{
      name: 'refreshToken',
      value: refreshToken,
      options: {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict',
        path: 'api/auth/refresh'
      }
    }];
    const { password: userPassword, ...userWithoutPassword } = user.toObject();
    const responseData = createResponseData(res, 200, 'User logged in',
      {'Authorization': `Bearer ${authToken}`},
      userWithoutPassword, cookies);
    return ResponseBuilder.success(responseData);
  }
  catch (error) {
    next(error);
  }
}

exports.refreshAuthToken = (req, res, next) => {
  try {
    const jwtPayload = {userId: req.userId};
    const  authToken = CreateJWT.access(jwtPayload);

    const responseData = createResponseData(res, 200, 'Authorized',
      {'Authorization': `Bearer ${authToken}`});

    return ResponseBuilder.success(responseData);
  } catch (error) {
    next(error);
  }
}