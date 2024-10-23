const router = require('express').Router();
const {authRouter} = require('./authRoutes');
const {userRouter} = require('./userRoutes');

router.use('/api/auth/', authRouter);
router.use('/api/user/', userRouter);

module.exports = router;