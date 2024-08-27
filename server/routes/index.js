const router = require('express').Router();
const {authRouter} = require('./authRoutes');

router.use('/api/auth/', authRouter);

module.exports = router;