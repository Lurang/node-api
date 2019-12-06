const express = require('express');

const deController = require('../controller/de');

const router = express.Router();

router.route('/')
    .get(deController.getDe)
    //.post(deController.postDe);

exports.routes = router;