const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const {login, dashboard} = require('../controllers/main');

//router.route('/dashboard').get(dashboard);
router.route('/dashboard').get(authMiddleware,dashboard);  //using middleware to authenticate
router.route('/login').post(login);

module.exports = router;