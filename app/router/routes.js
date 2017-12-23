var express = require('express');
var querystring = require('querystring');
var router = express.Router();
var controller = require('../controller/controller');
router.get('/', controller.login);
router.post('/', controller.loginHandler);
router.get('/regist', controller.registPage);
router.post('/regist', controller.register);
router.post('/logout', controller.logout);
router.get('*', controller.redirecter);


module.exports = router;
