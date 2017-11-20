/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

const apiHome = require('../controller/apiHome');
const userAuth = require('../controller/userAuth');

const demands = require('../controller/demand')
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

router.get('/demands', demands.getAllDemands);

router.get('/demands/:demandId', demands.getDemand);

router.use(userAuth.checkAuth); // Routes that require and api_token after this


// Post Modification Routes //
router.post('/createDemand', demandModification.createDemand);
router.put('/editDemand/:demandId', demandModification.editDemand);

router.post('/bidOnDemand', demandModification.bidOnDemand);

// Return Router
module.exports = router;
