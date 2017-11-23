/*jshint esversion: 6 */

// Dependencies
const express = require('express');
const router = express.Router();

const authRoute = require('../controller/auth');
const userInfo = require('../controller/user');
const opportunityRoute = require('../controller/getOpportunities');
const opportunityModification = require('../controller/opportunityModification');

router.post('/registerUser', authRoute.registerUser);
router.post('/loginUser', authRoute.loginUser);

router.post('/userInfobyEmail', userInfo.getUserbyEmail);
router.post('/userInfobyID', userInfo.getUserbyID);

router.get('/getOpportunities', opportunityRoute.getOpportunities);

router.post('/getOpportunitybyID', opportunityRoute.getOpportunitybyID);
router.post('/getOpportunitiesbyVolunteer', opportunityRoute.getOpportunitiesbyVolunteer);
// Routes that require an api_token after this

router.use(authRoute.checkAuth);

router.post('/userInfobyAPI', userInfo.getUserbyAPI);
router.post('/createOpportunity', opportunityModification.createOpportunity);
router.post('/registerForOpportunity', opportunityModification.registerForOpportunity);

// Return Router
module.exports = router;
