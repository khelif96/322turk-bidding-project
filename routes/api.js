/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

const apiHome = require('../controller/apiHome');


// API
router.get('/', apiHome.getApi);
router.post('/', apiHome.postApi);

// Return Router
module.exports = router;
