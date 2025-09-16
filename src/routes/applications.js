const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a new agent application
router.post('/', applicationsController.createApplication);

// Save or update personal details
router.put('/:id/personal-details', applicationsController.updatePersonalDetails);

// Save or update educational qualification
router.put('/:id/education', applicationsController.updateEducation);

// Save or update witness details
router.put('/:id/witness-details', applicationsController.updateWitnessDetails);

// Calculate and return ARI score
router.get('/:id/ari-score', applicationsController.getARIScore);

// Submit the completed application
router.post('/:id/submit', applicationsController.submitApplication);

// Save or update work details for an application
router.put('/:id/work-experience', applicationsController.saveWorkDetails);

// Create work details for an application
router.post('/:id/work-experience', applicationsController.createWorkDetails);

// Get personal details for an application
router.get('/:id/personal-details', async (req, res) => {
  try {
    const applicationId = req.params.id;
    const personalDetails = await require('../models/PersonalDetails').findOne({ where: { applicationId } });
    if (!personalDetails) {
      return res.status(404).json({ error: 'Personal details not found' });
    }
    res.json(personalDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get ARI score for an application
router.get('/:id/ari-score', async (req, res) => {
  try {
    const applicationId = req.params.id;
    const ARIScore = require('../models/ARIScore');
    const ariScore = await ARIScore.findOne({ where: { applicationId } });
    if (!ariScore) {
      return res.status(404).json({ error: 'ARI score not found' });
    }
    res.json(ariScore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get work details for an application
router.get('/:id/work-experience', applicationsController.getWorkDetails);

// Save or update bank details for an application
router.put('/:id/bank-details', applicationsController.saveBankDetails);

// Get bank details for an application
router.get('/:id/bank-details', applicationsController.getBankDetails);

// Address & Contact Details
router.put('/:applicationId/address-contact',
  async (req, res) => {
    req.body.applicationId = req.params.applicationId;
    return applicationsController.upsertAddressContactDetails(req, res);
  }
);

// GET Address & Contact Details by applicationId
router.get('/:applicationId/address-contact', applicationsController.getAddressContactDetails);

// Get all personal details (for summary list)
router.get('/personal-details', async (req, res) => {
  try {
    const personalDetails = await require('../models/PersonalDetails').findAll();
    res.json(personalDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/config/dropdowns', applicationsController.getDropdownConfigs);

// Work Station Details routes
router.put('/:id/workstation-details', applicationsController.updateWorkStationDetails);
router.get('/:id/workstation-details', applicationsController.getWorkStationDetails);

// Save or update Exam Details for an application
router.put('/:id/exam-details', applicationsController.saveExamDetails);

// Get Exam Details for an application
router.get('/:id/exam-details', applicationsController.getExamDetails);

// Get witness details for an application
router.get('/:id/witness-details', applicationsController.getWitnessDetails);

// Document & Legal Compliance routes
router.post('/:id/documents/upload', upload.single('file'), applicationsController.uploadDocument);
router.put('/:id/documents/upload', upload.single('file'), applicationsController.upsertDocument);
router.get('/:id/documents/:documentId', applicationsController.getDocument);

module.exports = router;
