/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

const apiHome = require('../controller/superUser/apiHome');
const userAuth = require('../controller/superUser/userAuth');
const users = require('../controller/superUser/users')

// API
// Base API Route
router.get('/', apiHome.getApi);
router.post('/', apiHome.postApi);

router.use(userAuth.checkAuth);



router.post('/unverifiedUsers', users.getUnverifiedUsers);
router.post('/verifyUser', users.verifyUser);
router.post('/rejectUser', users.rejectUser);


// Return Router
module.exports = router;
