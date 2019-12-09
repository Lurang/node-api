const express = require('express')

const authController = require('../controller/auth');

const router = express.Router();

router.route('/')
    .post(authController.login)

exports.routes = router;