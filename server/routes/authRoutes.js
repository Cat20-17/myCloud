const authRouter = require('express').Router();
const { passwordValidation, emailValidation, userNameValidation } = require('../middlewares/validators');
const authController = require('../controllers/authController');

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
authController.login);

module.exports = {authRouter};