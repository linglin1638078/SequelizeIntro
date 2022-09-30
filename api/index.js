//localhost:3000/api

const express = require('express');
const router = new express.Router();

const userRouter = require('./user');
router.use('/user', userRouter);

const postRouter = require('./post');
router.use('/post', postRouter);

module.exports = router;