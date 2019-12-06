const express = require('express')

const apiController = require('../controller/api');

const router = express.Router();

router.route('/')
    .get(apiController.getDe)
//api
router.route('/getUser')
    .get(apiController.getUser)
router.route('/addUser')
    .post(apiController.addUser)
router.route('/searchUser/:id')
    .post(apiController.postSearch)
router.route('/updateUser')
    .put(apiController.updateUser)
router.route('/deleteUser')
    .delete(apiController.deleteUser)
router.route('/loginUser')
    .post(apiController.loginUser)
    
exports.routes = router;
