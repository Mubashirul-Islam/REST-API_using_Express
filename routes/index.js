const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/searchController');
const DetailsController = require('../controllers/detailsController');
const { validateLocation, validateDetailsRequest } = require('../middleware/validator');

/**
 * @route   GET /search/:locationname
 * @desc    Search for flights and attractions by location
 * @access  Public
 */
router.get('/search/:locationname', validateLocation, SearchController.search);

/**
 * @route   GET /details/:id?searchtype=flight/attraction
 * @desc    Get flight or attraction details by ID
 * @access  Public
 */
router.get('/details/:id', validateDetailsRequest, DetailsController.getDetails);

module.exports = router;