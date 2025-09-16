const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

// Get dropdown configurations
router.get('/dropdowns', applicationsController.getDropdownConfigs);

module.exports = router;
