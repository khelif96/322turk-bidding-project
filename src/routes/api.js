/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

const apiHome = require('../controller/apiHome');
const userAuth = require('../controller/userAuth');

// API
router.get('/', apiHome.getApi);
router.post('/', apiHome.postApi);

router.get('/loginUser', userAuth.getLoginUser);
router.post('/loginUser', userAuth.loginUser);

router.post('/registerUser', userAuth.registerUser);

// Return Router
module.exports = router;
