Product Requirements Document (PRD)
Agent Onboarding Application System
1. Executive Summary
Product Name: Agent Onboarding Application System
Version: 1.1
Document Date: June 25, 2025
Target Audience: Code Generation Models & Development Teams
O
bjective: Develop a streamlined agent onboarding system that enables Head of Branch (HOB) users
to register new insurance agents through a structured 5-stage process, calculate eligibility scores, and
submit applications for backend processing.
2. Product Overview
The Agent Onboarding Application System is a digital platform designed for insurance companies to
onboard new agents efficiently. The system captures agent information through five sequential stages,
validates data, calculates an Average Recruitment Indicator (ARI) score, and submits completed
applications for approval.
Key Value Propositions:
Streamlined agent registration process
Automated eligibility scoring
Structured data validation
Comprehensive work experience tracking
Consistent onboarding experience
3. User Personas
Primary Persona: Head of Branch (HOB)
Role: Senior manager responsible for agent recruitment and onboarding
Goals: Efficiently register qualified agents, ensure data accuracy, meet recruitment targets
Pain Points: Manual paperwork, inconsistent data collection, lengthy approval processes
4. System Architecture & Data Flow
Updated Flow: Stage 1: Personal Details → Stage 2: Educational Qualification → Stage 3: Work
Experience → Stage 4: Witness Details & T&C → Stage 5: ARI Report & Submission
Data Storage: Local device database with backend synchronization
Application Number Generation: First 4 digits of User ID + DateTime
5. Feature Breakdown - User Stories
EPIC 1: Personal Details Management
User Story 1.1: Personal Information Form
As a HOB
I want to capture agent's personal information in a structured form
So that I can maintain accurate records for the onboarding process
Acceptance Criteria:
Display form with 15 required fields (Designation, Title, Initials, First Name, Last Name, etc.)
Implement field validation (character limits, format checks)
Auto-generate Application Number on form initialization
Provide Save and Next buttons with appropriate validation
Technical Requirements:
Dropdown fields populated from backend configuration
Text fields with specified character limits
Date picker in DD/MM/YYYY format
Radio buttons for binary choices
Real-time validation feedback
User Story 1.2: Data Validation & Error Handling
As a HOB
I want to receive clear validation feedback
So that I can correct errors before proceeding
Acceptance Criteria:
Display asterisk (*) for mandatory fields
Show inline error messages for validation failures
Validate NIC uniqueness across all records
Enforce minimum age requirement (18 years)
Prevent Next button activation until all validations pass
User Story 1.3: Form State Management
As a HOB
I want to save my progress without completing the entire form
So that I can continue the application later
Acceptance Criteria:
Save button stores current data to local database
Form retains data when navigating back/forward
Handle partial completion scenarios
Display loading states during save operations
EPIC 2: Educational Qualification Assessment
User Story 2.1: Educational Qualification Form
As a HOB
I want to capture agent's educational background
So that I can assess their qualifications for the role
Acceptance Criteria:
Display radio buttons for G.C.E. O/L, A/L, Diploma, Degree (Pass/Fail options)
Show grade dropdowns for O/L English and Maths (A, B, C, S, W)
Provide checkboxes for degree categories (HR, Banking & Insurance, Sales & Marketing, ICT)
Include toggles for extracurricular activities and second language
Technical Requirements:
Conditional field enabling based on Pass/Fail selections
Dynamic UI updates when selections change
Configurable options from backend
Form validation before proceeding
User Story 2.2: Grade Selection Logic
As a HOB
I want grade fields to be enabled only when applicable
So that data entry is logical and consistent
Acceptance Criteria:
Disable grade dropdowns when G.C.E. O/L is "Fail/Not Done"
Show tooltip "Grade not applicable for 'Not Done'" when user attempts invalid selection
Enable/disable fields dynamically based on user selections
Maintain data consistency across form states
User Story 2.3: Educational Data Validation
As a HOB
I want to ensure all educational data is valid before proceeding
So that the application contains accurate information
Acceptance Criteria:
Validate all required fields are completed
Check logical consistency of selections
Display field-specific error messages
Enable Save & Continue button only when validation passes
EPIC 3: Work Experience Assessment
User Story 3.1: Work Experience Capture
As a HOB
I want to capture, view, and verify an agent/applicant's previous work experience in a structured
manner
So that I can assess their professional background for the role
Acceptance Criteria:
Display "Previous Work Experience" toggle (Yes/No)
If "No" selected, hide all subsequent work experience fields and enable "Save & Continue" button
If "Yes" selected, display Duration dropdown with options:
Less than 2 yrs
More than 2 yrs
More than 3 yrs
More than 5 yrs
Show "Previous Experience at an Insurance Company" toggle (Yes/No)
Technical Requirements:
Conditional field rendering based on toggle selections
Dynamic form state management
Progressive disclosure of relevant fields
User Story 3.2: Insurance Experience Details
As a HOB
I want to capture detailed insurance industry experience
So that I can evaluate the candidate's relevant background
Acceptance Criteria:
When "Previous Experience at an Insurance Company" = "Yes", display:
Name of Employer & Branch (required text field)
Position Held (required text field)
Period Worked - From (required date field)
Period Worked - To (required date field)
Contact No. (required numeric field, 10 digits)
When "Previous Experience at an Insurance Company" = "No", hide all insurance experience fields
Technical Requirements:
Date picker components with DD/MM/YYYY format
Numeric input validation for contact numbers
Dynamic field visibility based on selection
User Story 3.3: Work Experience Validation
As a HOB
I want to ensure all work experience data is valid before proceeding
So that the application contains accurate professional information
Acceptance Criteria:
Display inline red error messages for required fields: "This field is required"
For date validation, if "From" > "To", show: "'Period Worked – To' must be later than or equal to
'From'"
For contact number, if non-numeric or wrong length, show: "Enter a valid 10-digit contact number"
Prevent f
uture dates in work experience periods
Enable "Save & Continue" button only when all validations pass
User Story 3.4: Work Experience Navigation
As a HOB
I want to navigate between work experience and other sections
So that I can complete the application efficiently
Acceptance Criteria:
Provide "Navigate Back" button to return to Educational Qualification screen
Provide "Save & Continue" button to proceed to Witness Details screen
Maintain form state during navigation
Auto-save progress when navigating between sections
EPIC 4: Witness Details & Legal Compliance
User Story 4.1: Witness Information Capture
As a HOB
I want to capture witness details for verification
So that the application meets legal requirements
Acceptance Criteria:
Provide fields for two witnesses (Name, NIC, Address)
Mark all witness fields as required with asterisk (*)
Validate NIC format (XXXXXXXXXV pattern)
Display clear error messages for missing or invalid data
User Story 4.2: Terms & Conditions Acceptance
As a HOB
I want to ensure agent accepts all policies
So that legal compliance is maintained
Acceptance Criteria:
Display checkboxes for Agent Agreement, Code of Conduct, Anti-Corruption Policy, Anti-Money
Laundering Policy
Require all policy acceptances before proceeding
Prevent form submission without complete acceptance
Store acceptance timestamps
User Story 4.3: Digital Signature Upload
As a HOB
I want to capture agent's digital signature
So that the application is legally binding
Acceptance Criteria:
Accept only .JPG or .JPEG file formats
Display error for unsupported file formats
Validate file size and quality
Preview
uploaded signature
Store signature securely
User Story 4.4: Witness Form Navigation
As a HOB
I want to navigate between form sections easily
So that I can complete the application efficiently
Acceptance Criteria:
Provide Back, Save, and Next buttons
Maintain form state during navigation
Validate current section before allowing progression
Save data automatically on navigation
EPIC 5: Average Recruitment Indicator (ARI) & Submission
User Story 5.1: ARI Score Calculation
As a HOB
I want to view the automatically calculated ARI score
So that I can assess the agent's eligibility objectively
Acceptance Criteria:
Display table with 10 eligibility categories
Auto-calculate points for each category based on previous form data
Show total ARI score at bottom of table
Update scores dynamically if
underlying data changes
ARI Categories & Scoring:
1. Civil Status: Based on marital status from Personal Details
2. Age: Calculated from DOB with age ranges mapped to scores
3. Education: Highest completed level (max 15 points)
4. O/L
Maths: Grade mapped to score (A=5 to W=0)
5. O/L English: Same as above
6. Work Experience: Years mapped to fixed scores (Updated scoring based on duration selection)
7. Having Children: Yes=5, No=0
8. Introduced SO Age: Optional f
uture integration
9. Scouts/Prefect/etc.: Toggle-based from Educational section
10. Second Language: Sinhala/Tamil known=10, else 0
User Story 5.2: PEP Status Declaration
As a HOB
I want to capture Politically Exposed Person (PEP) status
So that compliance requirements are met
Acceptance Criteria:
Display PEP question with Yes/No options
Make PEP selection mandatory before submission
Show error if attempting to submit without PEP selection
Store PEP status with application data
User Story 5.3: Application Submission Logic
As a HOB
I want to submit or reject applications based on ARI scores
So that only qualified agents proceed to approval
Acceptance Criteria:
Require minimum ARI score of 30 for submission
Display error message if ARI < 30: "Minimum ARI score of 30 required to proceed"
Provide Send, Reject, and Back buttons
Enable Send button only when all validations pass
Update application status upon successf
ul submission
User Story 5.4: Application Status Management
As a HOB
I want to track application status changes
So that I can monitor the onboarding pipeline
Acceptance Criteria:
Update status to "Submitted" upon successf
ul submission
Handle rejection with reason capture (f
uture enhancement)
Maintain audit trail of status changes
Sync status with backend systems
EPIC 6: Cross-Cutting Features
User Story 6.1: Form Navigation System
As a HOB
I want to navigate seamlessly between application stages
So that I can complete applications efficiently
Acceptance Criteria:
Maintain consistent navigation patterns across all stages
Preserve form data during navigation
Display current stage indicator
Allow
backward navigation with data retention
User Story 6.2: Data Persistence & Sync
As a HOB
I want my data to be saved reliably
So that I don't lose progress during the application process
Acceptance Criteria:
Save data to local database on each stage completion
Implement auto-save f
unctionality
Handle offline scenarios gracef
ully
Sync with backend when online
User Story 6.3: Error Handling & User Feedback
As a HOB
I want to receive clear feedback about system status
So that I understand what actions to take
Acceptance Criteria:
Display loading states during operations
Show success/error messages clearly
Provide actionable error messages
Handle network connectivity issues
6. Technical Specifications
6.1 Data Models
Agent Application:
applicationNumber: String (generated)
userId: String
status: Enum (Draft, Pending, Submitted, Approved, Rejected)
createdDate: DateTime
lastModified: DateTime
Personal Details:
designation: String
title: String
initials: String (max 10)
firstName: String (max 50)
lastName: String (max 50)
nameByInitials: String (max 50)
civilStatus: String
hasChildren: Boolean
nationality: String
dateOfBirth: Date
passportNo: String (max 9)
rejoin: String
preferredLanguage: String
nicNo: String (unique)
takaf
ulAgent: Boolean
Educational Qualification:
gceOLStatus: Enum (Pass, Fail)
gceALStatus: Enum (Pass, Fail)
diplomaStatus: Enum (Pass, Fail)
degreeStatus: Enum (Pass, Fail)
olEnglishGrade: Enum (A, B, C, S, W)
olMathsGrade: Enum (A, B, C, S, W)
degreeCategories: Array[String]
extracurricularActivities: Boolean
secondLanguage: Boolean
Work Experience (New):
hasPreviousWorkExperience: Boolean
workExperienceDuration: Enum (Less than 2 yrs, More than 2 yrs, More than 3 yrs, More than 5
yrs)
hasInsuranceExperience: Boolean
employerName: String (required if hasInsuranceExperience = true)
positionHeld: String (required if hasInsuranceExperience = true)
workPeriodFrom: Date (required if hasInsuranceExperience = true)
workPeriodTo: Date (required if hasInsuranceExperience = true)
employerContactNo: String (10 digits, required if hasInsuranceExperience = true)
Witness Details:
witness1Name: String
witness1NIC: String
witness1Address: String
witness2Name: String
witness2NIC: String
witness2Address: String
signatureFile: File
policyAcceptances: O
bject
ARI Score:
civilStatusScore: Number
ageScore: Number
educationScore: Number
olMathsScore: Number
olEnglishScore: Number
workExperienceScore: Number (Updated calculation based on duration)
childrenScore: Number
introducerAgeScore: Number
extracurricularScore: Number
secondLanguageScore: Number
totalScore: Number
pepStatus: Boolean
6.2 API Endpoints
Base U
R
L:/api/v1/agent-onboarding
1. POST /applications - Create new application
2. PUT /applications/{id}/personal-details - Save personal details
3. PUT /applications/{id}/education - Save educational qualification
4. PUT /applications/{id}/work-experience - Save work experience details (New)
5. PUT /applications/{id}/witness-details - Save witness details
6. GET /applications/{id}/ari-score - Calculate ARI score
7. POST /applications/{id}/submit - Submit application
8. GET /config/dropdowns - Get dropdown configurations
6.3 Validation R
ules
Personal Details:
All fields marked with (*) are mandatory
NIC must be unique across system
Age must be >
= 18 years
Character limits enforced on text fields
Date format: DD/MM/YYYY
Educational Qualification:
Grade selection only available if corresponding exam status is "Pass"
At least one educational qualification must be completed
Degree categories allow multiple selections
Work Experience (New):
If "Previous Work Experience" = "Yes", Duration selection is mandatory
If "Previous Experience at an Insurance Company" = "Yes", all insurance experience fields are
mandatory
Work period "From" date must be earlier than or equal to "To" date
Work period dates cannot be in the f
uture
Contact number must be exactly 10 digits and numeric
Work experience duration affects ARI calculation scoring
Witness Details:
All witness fields are mandatory
NIC format: XXXXXXXXXV (9 digits + V)
Signature file: .JPG or .JPEG only
All policy acceptances required
ARI Submission:
Minimum total score: 30
PEP status must be selected
All previous stages must be completed
7. User Interface Requirements
7.1 Design Principles
Clean, professional interface suitable for business users
Consistent navigation patterns across all stages
Clear visual hierarchy with proper spacing
Responsive design for various screen sizes
Accessibility compliance (WCAG 2.1 AA)
7.2 Common UI Elements
Primary buttons: [Save], [Next], [Submit], [Save & Continue]
Secondary buttons: [Back], [Navigate Back], [Cancel]
Required field indicator: Red asterisk (*)
Error messages: Red text below
field
Success messages: Green notification banner
Loading states: Spinner with descriptive text
7.3 Form Layout
Single-column layout for better readability
Logical grouping of related fields
Progressive disclosure for complex sections
Clear section headers and descriptions
Consistent field sizing and alignment
7.4 Work Experience Screen Layout (New)
Section header: "Work Experience"
Toggle controls with clear Yes/No options
Conditional field groups with smooth transitions
Date picker components with calendar interface
Validation feedback positioned below each field
Navigation buttons at bottom: [Navigate Back] [Save & Continue]
8. Success Metrics
8.1 Functional Metrics
Application completion rate: >90%
Data validation error rate: <5%
Form abandonment rate: <10%
ARI calculation accuracy: 100%
Work experience data completeness: >95%
8.2 Performance Metrics
Page load time: <3 seconds
Form save time: <2 seconds
Application submission time: <5 seconds
System uptime: 99.5%
8.3 User Experience Metrics
User task completion time: <20 minutes per application (updated for 5-stage process)
Error resolution time: <1 minute
User satisfaction score: >4.0/5.0
9. Assumptions & Dependencies
9.1 Assumptions
Users have basic computer literacy
Stable internet connection for backend sync
Digital signature files are readily available
Backend configuration API is available
Work experience documentation is accessible
9.2 Dependencies
Backend API development (including new work experience endpoints)
Database schema implementation (including work experience tables)
File upload service configuration
User authentication system
Dropdown configuration management
10. Risk Analysis
10.1 Technical Risks
Data Loss: Implement robust local storage and backup mechanisms
Validation Conflicts: Maintain consistent validation rules across frontend and backend
Performance Issues: Optimize form rendering and data processing
Complex State Management: Handle conditional field visibility and validation logic
10.2 Business Risks
User Adoption: Provide comprehensive training and support
Compliance: Ensure all legal requirements are met
Data Security: Implement proper encryption and access controls
Extended Form Length: Monitor user engagement through 5-stage process
11. Implementation Guidelines for Code Generation Models
11.1 Development Approach
Implement each User Story as an independent module
Use consistent naming conventions across all components
Implement comprehensive error handling
Follow defensive programming practices
Ensure all validations are implemented both client-side and server-side
11.2 Code Organization
11.3 Testing Requirements
Unit tests for all validation f
unctions
Integration tests for form workflows
End-to-end tests for complete 5-stage application flow
Error scenario testing
Performance testing for large datasets
Specific testing for work experience conditional logic
11.4 Work Experience Implementation Notes
Implement toggle-based conditional rendering
Use React state management for dynamic field visibility
Implement date validation logic for work periods
Create reusable validation f
unctions for contact numbers
Ensure smooth transitions when showing/hiding field groups
Implement proper error state management for conditional fields
This updated PRD provides comprehensive guidance for implementing the enhanced 5-stage Agent
Onboarding Application System, including the new Work Experience assessment stage. Each user
story is designed to be independent and implementable in parallel, while maintaining system cohesion
through well-defined interfaces and data models.
/src
/components
/PersonalDetails
/EducationalQualification
/WorkExperience # New component
/WitnessDetails
/ARIReport
/common
/services
/api
/validation
/storage
/utils
/calculations
/formatters
/types
/models
/interfaces