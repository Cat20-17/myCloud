const authRouter = require('express').Router();
const { passwordValidation, emailValidation, userNameValidation } = require('../middlewares/validators');
const authController = require('../controllers/authController');
const CheckJWT = require('../middlewares/checkJWT');
authRouter.post('/register', [
  ...userNameValidation,
  ...emailValidation,
  ...passwordValidation
],
  authController.register
);
authRouter.post('/login', [
  ...emailValidation,
  ...passwordValidation,
],
authController.login
);
authRouter.post('/refresh',
  CheckJWT.checkRefreshToken,
  authController.refreshAuthToken
);

module.exports = { authRouter };