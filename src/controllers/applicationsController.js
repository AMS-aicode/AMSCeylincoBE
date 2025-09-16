const AgentApplication = require('../models/AgentApplication');
const PersonalDetails = require('../models/PersonalDetails');
const EducationalQualification = require('../models/EducationalQualification');
const WitnessDetails = require('../models/WitnessDetails');
const { Op } = require('sequelize');
const ARIScore = require('../models/ARIScore');
const WorkExperience = require('../models/WorkExperience')(require('../db'));
const BankDetails = require('../models/BankDetails')(require('../db'));
const WorkStationDetails = require('../models/WorkStationDetails');
const sequelize = require('../db');
const ExamDetails = require('../models/ExamDetails')(sequelize);
const DropdownConfigs = require('../models/DropdownConfigs')(sequelize);
const Document = require('../models/Document')(sequelize);
const fs = require('fs');
const path = require('path');
// Controller for agent application routes

exports.createApplication = async (req, res) => {
  try {
    const {
      userId,
      designation,
      title,
      initials,
      firstName,
      lastName,
      nameByInitials,
      civilStatus,
      hasChildren,
      nationality,
      dateOfBirth,
      passportNo,
      rejoin,
      preferredLanguage,
      nicNo,
      takafulAgent
    } = req.body;

    // Validate required fields
    if (!userId || !designation || !title || !initials || !firstName || !lastName || !nameByInitials || !civilStatus || typeof hasChildren === 'undefined' || !nationality || !dateOfBirth || !nicNo) {
      return res.status(400).json({ error: 'Missing required personal details fields.' });
    }

    // Character limits and format checks
    if (initials.length > 10 || firstName.length > 50 || lastName.length > 50 || nameByInitials.length > 50 || (passportNo && passportNo.length > 9)) {
      return res.status(400).json({ error: 'Field character limit exceeded.' });
    }

    // Check NIC uniqueness
    const existingNIC = await PersonalDetails.findOne({ where: { nicNo } });
    if (existingNIC) {
      return res.status(409).json({ error: 'NIC already exists.' });
    }

    // Age validation (must be >= 18)
    const dob = new Date(dateOfBirth);
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 18) {
      return res.status(400).json({ error: 'Agent must be at least 18 years old.' });
    }

    // Generate application number: first 4 of userId + DateTime (YYYYMMDDHHmmss)
    const now = new Date();
    const dateTimeStr = now.toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const applicationNumber = `${userId.substring(0, 4).toUpperCase()}${dateTimeStr}`;

    // Create application
    const application = await AgentApplication.create({
      applicationNumber,
      userId,
      status: 'Draft',
      createdDate: now,
      lastModified: now
    });
    console.log('Creating PersonalDetails with:', { ...req.body, applicationId: application.id });
    // Create personal details with applicationId (should be integer id)
    await PersonalDetails.create({
      ...req.body,
      applicationId: application.id
    });

    // Always insert ARI civilStatusScore and childrenScore based on civilStatus and hasChildren value
    let civilStatusScore = 0;
    if (req.body.civilStatus === 'Married') civilStatusScore = 5;
    else if (req.body.civilStatus === 'Single') civilStatusScore = 3;
    else civilStatusScore = 1;

    let childrenScore = 0;
    if (req.body.hasChildren === true) childrenScore = 5;
    else childrenScore = 0;

    // Map O/L Maths grade to score (A=5, B=4, C=3, S=2, W=0)
    let olMathsScore = 0;
    if (req.body.olMathsGrade === 'A') olMathsScore = 5;
    else if (req.body.olMathsGrade === 'B') olMathsScore = 4;
    else if (req.body.olMathsGrade === 'C') olMathsScore = 3;
    else if (req.body.olMathsGrade === 'S') olMathsScore = 2;
    else olMathsScore = 0;

    // Create ARI score row with all available fields
    await ARIScore.create({
      civilStatusScore,
      childrenScore,
      olMathsScore,
      applicationId: application.id
    });



    return res.status(201).json({
      message: 'Application created successfully',
      applicationId: application.id,
      applicationNumber
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updatePersonalDetails = async (req, res) => {
  try {
    const applicationId = parseInt(req.params.id, 10);
    const data = req.body;

    // Exclude the current record from the NIC uniqueness check
    const existingNIC = await PersonalDetails.findOne({
      where: {
        nicNo: data.nicNo,
        applicationId: { [Op.ne]: applicationId }
      }
    });
    if (existingNIC) {
      return res.status(409).json({ error: 'NIC already exists' });
    }

    let personal = await PersonalDetails.findOne({ where: { applicationId } });
    if (personal) {
      await personal.update(data);
    } else {
      await PersonalDetails.create({ applicationId, ...data });
    }
    return res.status(200).json({ message: 'Personal details saved successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const applicationId = parseInt(req.params.id, 10);
    const {
      gceOLStatus,
      gceALStatus,
      diplomaStatus,
      degreeStatus,
      olEnglishGrade,
      olMathsGrade,
      degreeCategories,
      extracurricularActivities,
      secondLanguage
    } = req.body;

    // Validation: At least one qualification must be completed (Pass)
    if (![gceOLStatus, gceALStatus, diplomaStatus, degreeStatus].includes('Pass')) {
      return res.status(400).json({ error: 'At least one educational qualification must be completed (Pass).' });
    }

    // Validation: Grade selection only if O/L is Pass
    if (gceOLStatus !== 'Pass' && (olEnglishGrade || olMathsGrade)) {
      return res.status(400).json({ error: 'Grades only allowed if O/L is Pass.' });
    }

    // Validation: Degree categories only if degreeStatus is Pass
    if (degreeStatus !== 'Pass' && degreeCategories && degreeCategories.length > 0) {
      return res.status(400).json({ error: 'Degree categories only allowed if Degree is Pass.' });
    }

    // Upsert logic: One education record per application
    let edu = await EducationalQualification.findOne({ where: { applicationId } });
    if (edu) {
      await edu.update({
        gceOLStatus,
        gceALStatus,
        diplomaStatus,
        degreeStatus,
        olEnglishGrade,
        olMathsGrade,
        degreeCategories,
        extracurricularActivities,
        secondLanguage
      });
    } else {
      await EducationalQualification.create({
        applicationId,
        gceOLStatus,
        gceALStatus,
        diplomaStatus,
        degreeStatus,
        olEnglishGrade,
        olMathsGrade,
        degreeCategories,
        extracurricularActivities,
        secondLanguage
      });
    }

    // Upsert ARIScore for this application: keep existing civilStatusScore, update childrenScore, olMathsScore, and olEnglishScore
    let olMathsScore = 0;
    if (olMathsGrade === 'A') olMathsScore = 5;
    else if (olMathsGrade === 'B') olMathsScore = 4;
    else if (olMathsGrade === 'C') olMathsScore = 3;
    else if (olMathsGrade === 'S') olMathsScore = 2;
    else olMathsScore = 0;
    let olEnglishScore = 0;
    if (olEnglishGrade === 'A') olEnglishScore = 5;
    else if (olEnglishGrade === 'B') olEnglishScore = 4;
    else if (olEnglishGrade === 'C') olEnglishScore = 3;
    else if (olEnglishGrade === 'S') olEnglishScore = 2;
    else olEnglishScore = 0;
    // Fetch hasChildren from PersonalDetails for this application
    const personal = await PersonalDetails.findOne({ where: { applicationId } });
    let childrenScore = 0;
    if (personal && personal.hasChildren === true) childrenScore = 5;
    else childrenScore = 0;
    let ari = await ARIScore.findOne({ where: { applicationId } });
    if (ari) {
      await ari.update({ olMathsScore, olEnglishScore, childrenScore });
    } else {
      await ARIScore.create({ applicationId, olMathsScore, olEnglishScore, childrenScore });
    }

    return res.status(200).json({ message: 'Educational qualification saved successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateWitnessDetails = (req, res) => {
  // TODO: Implement logic to update witness details
  res.send('Update witness details');
};

exports.getARIScore = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const ariScore = await ARIScore.findOne({ where: { applicationId } });
    if (!ariScore) {
      return res.status(404).json({ error: 'ARI score not found' });
    }
    res.json(ariScore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.submitApplication = (req, res) => {
  // TODO: Implement logic to submit the application
  res.send('Submit application');
};


exports.updateWitnessDetails = async (req, res) => {
  try {
    const applicationId = parseInt(req.params.id, 10);
    const {
      witness1Name,
      witness1NIC,
      witness1Address,
      witness2Name,
      witness2NIC,
      witness2Address,
      signatureFile,
      policyAcceptances
    } = req.body;

    // Upsert logic: one witness record per application
    let witness = await WitnessDetails.findOne({ where: { applicationId } });
    if (witness) {
      await witness.update({
        witness1Name,
        witness1NIC,
        witness1Address,
        witness2Name,
        witness2NIC,
        witness2Address,
        signatureFile,
        policyAcceptances
      });
    } else {
      await WitnessDetails.create({
        applicationId,
        witness1Name,
        witness1NIC,
        witness1Address,
        witness2Name,
        witness2NIC,
        witness2Address,
        signatureFile,
        policyAcceptances
      });
    }
    return res.status(200).json({ message: 'Witness details saved successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Save or update work details for an application
exports.saveWorkDetails = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const data = req.body;

    // Upsert logic: update if exists, else create
    const [workDetails, created] = await WorkExperience.upsert({
      ...data,
      applicationId,
    });
    res.status(200).json({ success: true, workDetails });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get work details for an application
exports.getWorkDetails = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const workDetails = await WorkExperience.findAll({
      where: { applicationId },
    });
    res.status(200).json({ success: true, workDetails });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create new work details for an application
exports.createWorkDetails = async (req, res) => {
  try {
    const applicationId = parseInt(req.params.id, 10);
    const data = req.body;
    console.log('Received work details data:', data);
    let experience = data.experiences && Array.isArray(data.experiences) ? data.experiences[0] : {};
    // Map all required fields for WorkExperience
    const workDetails = await WorkExperience.create({
      applicationId,
      hasPreviousWorkExperience: data.hasPreviousWorkExperience === 'Yes' || data.hasPreviousWorkExperience === true,
      workExperienceDuration: data.workExperienceDuration || null,
      hasInsuranceExperience: data.hasInsuranceExperience === 'Yes' || data.hasInsuranceExperience === true,
      employerName: experience.employerName || null,
      positionHeld: experience.positionHeld || null,
      workPeriodFrom: experience.workPeriodFrom || null,
      workPeriodTo: experience.workPeriodTo || null,
      employerContactNo: experience.contactNo || null,
    });
    res.status(201).json({ success: true, workDetails });
  } catch (err) {
    console.error('Work details insert error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// Save or update bank details for an application
exports.saveBankDetails = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { bankName, bankBranch, accountType, accountNumber, passbookFileId } = req.body;

    // Uniqueness check for account number (exclude current record if updating)
    const existing = await BankDetails.findOne({
      where: {
        accountNumber,
        applicationId: { [Op.ne]: applicationId },
      },
    });
    if (existing) {
      return res.status(409).json({ error: 'This account number is already used.' });
    }

    // Upsert logic: update if exists, else create
    let bankDetails = await BankDetails.findOne({ where: { applicationId } });
    if (bankDetails) {
      await bankDetails.update({ bankName, bankBranch, accountType, accountNumber, passbookFileId });
    } else {
      await BankDetails.create({ applicationId, bankName, bankBranch, accountType, accountNumber, passbookFileId });
    }
    res.status(200).json({ message: 'Bank details saved successfully.' });
  } catch (err) {
    console.error('Bank details error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get bank details for an application
exports.getBankDetails = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const bankDetails = await BankDetails.findOne({ where: { applicationId } });
    if (!bankDetails) {
      return res.status(404).json({ error: 'Bank details not found.' });
    }
    res.status(200).json({ bankDetails });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create or update Address & Contact Details
exports.upsertAddressContactDetails = async (req, res) => {
  try {
    const { applicationId } = req.body;
    if (!applicationId) {
      return res.status(400).json({ error: 'applicationId is required' });
    }
    const AddressContactDetails = require('../models/AddressContactDetails')(require('../db'));
    // Explicit update-or-create logic
    let details = await AddressContactDetails.findOne({ where: { applicationId } });
    if (details) {
      await details.update(req.body);
      return res.status(200).json(details);
    } else {
      details = await AddressContactDetails.create(req.body);
      return res.status(201).json(details);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to save address & contact details' });
  }
};

// Get Address & Contact Details by applicationId
exports.getAddressContactDetails = async (req, res) => {
  try {
    const applicationId = req.params.applicationId;
    const AddressContactDetails = require('../models/AddressContactDetails')(require('../db'));
    const details = await AddressContactDetails.findOne({ where: { applicationId } });
    if (!details) {
      return res.status(404).json({ error: 'Address & Contact Details not found' });
    }
    return res.json(details);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch address & contact details' });
  }
};

// Get all personal details (for summary list)
exports.getAllPersonalDetails = async (req, res) => {
  try {
    const personalDetails = await PersonalDetails.findAll();
    res.status(200).json({ success: true, personalDetails });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Save or update Work Station Details
exports.updateWorkStationDetails = async (req, res) => {
  try {
    console.log('WorkStationDetails payload:', req.body); // Debug log
    const applicationId = parseInt(req.params.id, 10);
    const {
      groupDepartment,
      subDepCluster,
      branch,
      unit,
      supervisorName,
      introducedBySO,
      introducedBySOCode
    } = req.body;

    let workStation = await WorkStationDetails.findOne({ where: { applicationId } });
    if (workStation) {
      await workStation.update({
        groupDepartment,
        subDepCluster,
        branch,
        unit,
        supervisorName,
        introducedBySO,
        introducedBySOCode
      });
    } else {
      await WorkStationDetails.create({
        applicationId,
        groupDepartment,
        subDepCluster,
        branch,
        unit,
        supervisorName,
        introducedBySO,
        introducedBySOCode
      });
    }
    return res.status(200).json({ message: 'Work Station Details saved successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Work Station Details
exports.getWorkStationDetails = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const workStation = await WorkStationDetails.findOne({ where: { applicationId } });
    if (!workStation) {
      return res.status(404).json({ error: 'Work Station Details not found' });
    }
    res.json(workStation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Save or update Exam Details for an application
exports.saveExamDetails = async (req, res) => {
  try {
    const applicationId = parseInt(req.params.id, 10);
    const { ibslExams, selfPacedSection, preContractExamData, olExamIndexes } = req.body;

    // Upsert logic: one exam details record per application
    let exam = await ExamDetails.findOne({ where: { applicationId } });
    if (exam) {
      await exam.update({ ibslExams, selfPacedSection, preContractExamData, olExamIndexes });
    } else {
      await ExamDetails.create({ applicationId, ibslExams, selfPacedSection, preContractExamData, olExamIndexes });
    }
    return res.status(200).json({ message: 'Exam details saved successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get Exam Details for an application
exports.getExamDetails = async (req, res) => {
  try {
    const applicationId = parseInt(req.params.id, 10);
    const exam = await ExamDetails.findOne({ where: { applicationId } });
    if (!exam) {
      return res.status(404).json({ error: 'Exam details not found' });
    }
    res.json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get dropdown configurations for personal, address, and bank details
exports.getDropdownConfigs = async (req, res) => {
  try {
    const config = await DropdownConfigs.findOne();
    if (!config) {
      return res.status(404).json({ error: 'No dropdown config found' });
    }
    // Personal details dropdowns
    const designations = config.designation ? config.designation.split(',') : [];
    const titles = config.title ? config.title.split(',') : [];
    const nationalities = config.nationality ? config.nationality.split(',') : [];
    const languages = config.language ? config.language.split(',') : [];
    const civilStatuses = config.civilStatus ? config.civilStatus.split(',') : [];
    // Address details dropdowns
    const addressLine2 = config.addressLine2 ? config.addressLine2.split(',') : [];
    const cityTown = config.cityTown ? config.cityTown.split(',') : [];
    const province = config.province ? config.province.split(',') : [];
    const district = config.district ? config.district.split(',') : [];
    const electorate = config.electorate ? config.electorate.split(',') : [];
    const gramaNiladari = config.gramaNiladari ? config.gramaNiladari.split(',') : [];
    const dSecretariat = config.dSecretariat ? config.dSecretariat.split(',') : [];
    const postalCode = config.postalCode ? config.postalCode.split(',') : [];
    // Bank details dropdowns
    const banks = config.bank ? config.bank.split(',') : [];
    const bankBranches = config.bankBranch ? config.bankBranch.split(',') : [];
    const accountTypes = config.accountType ? config.accountType.split(',') : [];
    // Workstation details dropdowns
    const groupDepartments = config.groupDepartment ? config.groupDepartment.split(',') : [];
    const subDepartmentClusters = config.subDepartmentCluster ? config.subDepartmentCluster.split(',') : [];
    const branches = config.branch ? config.branch.split(',') : [];
    const units = config.unit ? config.unit.split(',') : [];
    const supervisorNames = config.supervisorName ? config.supervisorName.split(',') : [];
    res.json({
      designations,
      titles,
      nationalities,
      languages,
      civilStatuses,
      addressLine2,
      cityTown,
      province,
      district,
      electorate,
      gramaNiladari,
      dSecretariat,
      postalCode,
      banks,
      bankBranches,
      accountTypes,
      groupDepartments,
      subDepartmentClusters,
      branches,
      units,
      supervisorNames
    });
  } catch (err) {
    console.error('Dropdown config fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch dropdown configs' });
  }
};

// Get witness details for an application
exports.getWitnessDetails = async (req, res) => {
  try {
    const applicationId = req.params.id;
    console.log('DEBUG: getWitnessDetails called with applicationId:', applicationId);
    const witness = await WitnessDetails.findByApplicationId(applicationId);
    if (!witness) {
      console.log('DEBUG: No witness details found for applicationId:', applicationId);
      return res.status(404).json({ error: 'Witness details not found' });
    }
    console.log('DEBUG: Witness details found:', witness);
    res.json(witness);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Upload document for Document & Legal Compliance screen
exports.uploadDocument = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { documentType } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type.' });
    }
    if (file.size > 1024 * 1024) {
      return res.status(400).json({ error: 'File size exceeds 1MB.' });
    }
    // Save file to uploads directory
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);
    // Save document record in DB
    const doc = await Document.create({
      applicationId,
      documentType,
      fileName,
      fileType: file.mimetype,
      fileSize: file.size,
      fileStoragePath: filePath,
      uploadedAt: new Date()
    });
    return res.status(201).json({ message: 'Document uploaded successfully.', document: doc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Upsert (create or update) document for Document & Legal Compliance screen
exports.upsertDocument = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { documentType } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ error: 'Invalid file type.' });
    }
    if (file.size > 1024 * 1024) {
      return res.status(400).json({ error: 'File size exceeds 1MB.' });
    }
    // Save file to uploads directory
    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, file.buffer);
    // Upsert document record in DB
    const Document = require('../models/Document')(require('../db'));
    const existing = await Document.findOne({ where: { applicationId, documentType } });
    let doc;
    if (existing) {
      await existing.update({
        fileName,
        fileType: file.mimetype,
        fileSize: file.size,
        fileStoragePath: filePath,
        uploadedAt: new Date()
      });
      doc = existing;
    } else {
      doc = await Document.create({
        applicationId,
        documentType,
        fileName,
        fileType: file.mimetype,
        fileSize: file.size,
        fileStoragePath: filePath,
        uploadedAt: new Date()
      });
    }
    return res.status(201).json({ message: 'Document upserted successfully.', document: doc });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Get document by documentId
exports.getDocument = async (req, res) => {
  try {
    const { id, documentId } = req.params;
    const doc = await Document.findOne({ where: { applicationId: id, documentId } });
    if (!doc) {
      return res.status(404).json({ error: 'Document not found.' });
    }
    // Send file for preview
    res.sendFile(doc.fileStoragePath);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};