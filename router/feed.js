const express = require('express');

const feedController = require('../controller/feed');

const router = express.Router();

router.route('/')
    .get(feedController.getPa)
    //.post(feedController.postPa)
router.route('/:id')
    .get(feedController.getSe)
    
exports.routes = router;