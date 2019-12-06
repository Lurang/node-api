const express = require('express');

const searchController = require('../controller/search');

const router = express.Router();


router.route('/')
    .get(searchController.getSearch)
    //.post(searchController.postSearch)

exports.routes = router;