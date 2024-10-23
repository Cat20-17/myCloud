const userRouter = require('express').Router();
const userController = require('../controllers/userController');
const CheckJWT = require('../middlewares/CheckJWT');

userRouter.get('/files', CheckJWT.checkAuthToken, userController.getUserFiles);

module.exports = { userRouter };