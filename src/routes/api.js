/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

const apiHome = require('../controller/apiHome');
const userAuth = require('../controller/userAuth');
const demandModification = require('../controller/demandModification');
// API
// Base API Route
router.get('/', apiHome.getApi);
router.post('/', apiHome.postApi);

// Auth Routes //
// Login Route
router.get('/loginUser', userAuth.getLoginUser);
router.post('/loginUser', userAuth.loginUser);

// Register User Route
router.post('/registerUser', userAuth.registerUser);

// Post Modification Routes //
router.post('/createDemand', demandModification.createDemand);
router.post('/editDemand', demandModification.editDemand);
// Return Router
module.exports = router;
