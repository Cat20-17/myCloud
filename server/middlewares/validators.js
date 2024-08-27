const { body } = require('express-validator');

const passwordValidation = [
  body('password')
  .isLength({ min: 8, max: 20}).withMessage('Password must be at least 8 characters long')
  .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
  .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
  .matches(/\d/).withMessage('Password must contain at least one number')
  .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
  .not().matches(/\s/).withMessage('Password must not contain spaces')
  .custom((value, { req }) => {
    if (value.includes(req.body.userName, req.body.email)) {
      throw new Error('Password should not contain your userName or email');
    }
    return true;
  })
  ];
const userNameValidation = [
  body('userName')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
    .trim().escape(),
];
const emailValidation = [
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail()
];

module.exports = {
  passwordValidation,
  userNameValidation,
  emailValidation,
};