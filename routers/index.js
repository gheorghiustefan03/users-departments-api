const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const departmentRouter = require('./department');
const {resetDb} = require('../config');

router.use('/user', userRouter);
router.use('/department', departmentRouter);
router.get('/reset', resetDb);

module.exports = router;