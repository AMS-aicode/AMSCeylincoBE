Product Requirements Document (PRD)
Agent Onboarding Application System
1. Executive Summary
    • Product Name: Agent Onboarding Application System
    • Version: 1.0
    • Document Date: June 30, 2025
    • Target Audience: Code Generation Models & Development Teams
    • Objective: To digitize and streamline the end-to-end process of recruiting, validating, and activating new insurance agents, reducing onboarding time significantly and enhancing user experience.
2. Product Overview
The Agent Onboarding Application System is a digital platform designed to automate the multi-stage process of agent recruitment, from initial application to final sales code activation. It replaces manual, paper-based workflows with a structured, rule-based system that includes multi-level approvals, dynamic ARI score calculation, document uploads, and integration with external systems.
Key Value Propositions:
    • Streamlined and automated agent recruitment.
    • Enforced rule-based validations for compliance.
    • Data-driven decision-making with ARI scoring.
    • Comprehensive audit trails and notifications.
    • Reduced onboarding time to under five business days.
3. User Personas
    • Primary Persona: Head of Branch (HOB)
        ◦ Role: Initiates agent applications, fills in details across various stages, uploads documents, and submits applications for approval.
        ◦ Goals: Efficiently onboard new agents, ensure data accuracy, and manage the initial stages of the application process.
        ◦ Pain Points: Manual data entry, lengthy approval processes, and lack of real-time status updates.
    • Secondary Persona: Manager – Business Development (MBD) / Senior Manager – Business Development (SMBD) / Life Operations Officer (LOP) / Agency Admin (AA)
        ◦ Role: Involved in various stages of application review, approval, and final activation.
        ◦ Goals: Review applications, provide approvals/rejections, and ensure compliance with internal policies and external regulations.
        ◦ Pain Points: Manual review processes, tracking application progress, and ensuring all necessary documents are in place.
    • Tertiary Persona: Agent
        ◦ Role: The applicant whose data is being captured and processed.
        ◦ Goals: Successfully complete the onboarding process and receive their sales code.
        ◦ Pain Points: Lengthy application process, lack of transparency on application status.
4. System Architecture & Data Flow
The Agent Onboarding module integrates with the existing Agency Management System. Application data, including personal details, educational qualifications, work experience, bank details, exam details, workstation details, hospitalization benefits, document uploads, witness details, and ARI scores, are stored locally and synchronized with a backend database (e.g., MongoDB). The system interacts with external APIs for LMS, IASL, Core System, SAP, and SMS/Email gateways.
Key Flows:
    1. Application Initiation: HOB creates a new application, which generates an Application Number.
    2. Data Capture: HOB fills in various sections: Personal Details, Address & Contact, Educational Qualification, Work Experience, Bank Details, Exam Details, Workstation, Hospitalization Benefit, Document Upload, Witness Details & T&C.
    3. ARI Calculation: The system automatically calculates the Average Recruitment Indicator (ARI) score based on captured data.
    4. Approval Workflow: Applications are routed through MBD, SMBD, LOP, and AA based on ARI score, age, and other criteria.
    5. Sales Code Generation: Upon final approval, a sales code is generated and linked to the application.
    6. Agent Agreement: HOB can download, digitally sign, and upload the agent agreement post-sales code generation.
    7. Notifications: Automated email/SMS notifications are sent at various stages (submission, approval, rejection).
Data Storage: Local device database with backend synchronization (e.g., MongoDB) and a Core File System for documents.
5. Feature Breakdown - User Stories
EPIC 1: Agent Application Management
User Story 1.1: Agent Onboarding Summary
    • As a User (HOB, MBD, LOP, AA)
    • I want to view a detailed list of agent applications with their statuses
    • So that I can manage approvals and track progress.
    • Acceptance Criteria:
        ◦ The system displays an "Agent Onboarding summary screen" upon accessing the "Agent Onboarding" module.
        ◦ The summary screen lists applications with: Application Number, Sales Code, Name of the Applicant, Designation, and Application Status.
        ◦ Users can filter records by checking boxes for "Draft," "Pending for submission," "Rejected," "Submitted," and "Approved."
        ◦ Users can search records by "NIC" or "Application Number" using a search box and button.
        ◦ NIC and Sales Code searches require complete, valid formats (no symbols or wildcards).
        ◦ The "Draft" status displays incomplete applications that can be completed.
        ◦ "Pending Submission" displays completed applications with ARI calculated but not yet submitted to LOP.
        ◦ "Rejected" displays applications rejected by MBD/SMBD/LOP/AA.
        ◦ "Submitted" displays applications sent to the backend server (enabled only in online mode).
        ◦ "Approved" displays approved applications with their Sales Code.
        ◦ HOB can initiate a "New Application" from this screen, leading to the "Personal Details" screen where an Application Number is generated (First 4 Digits of User ID & Date Time).
        ◦ HOB can "Edit Application" for incomplete records; the edit button is disabled for submitted applications.
        ◦ HOB can "Delete Application" for records where a Sales Code has not been generated.
        ◦ An "Approval Tray" button is available and enabled for MBD, LOP, and AA to review applications for approval/rejection.
        ◦ The system displays status from the local database when offline.
    • Technical Requirements:
        ◦ API endpoint for fetching filtered application summaries.
        ◦ API endpoint for creating a new application (generating applicationNumber).
        ◦ API endpoint for deleting an application.
        ◦ Client-side search and filter logic.
        ◦ Local data persistence for offline access.
EPIC 2: Agent Personal & Contact Details
User Story 2.1: Capture Personal Details
    • As a HOB
    • I want to fill in the personal information of the agent
    • So that the onboarding process can begin with accurate records.
    • Acceptance Criteria:
        ◦ The "Personal Details" screen is displayed upon creating a new application or editing an existing one.
        ◦ The screen includes mandatory fields: Designation (Dropdown), Title (Dropdown), Initials (Text, max 10), First Name (Text, max 50), Last Name (Text, max 50), Name Denominated by Initials (Text, max 50), Civil Status (Dropdown), Having Children (Radio: Yes/No), Nationality (Dropdown), Date of Birth (Date Picker: DD/MM/YYYY), NIC No (Text).
        ◦ Optional fields: Passport No (Alphanumeric, max 9), Rejoin (Text), Preferred Language (Dropdown), Takaful Agent (Dropdown: Yes/No).
        ◦ "Save" button allows saving progress without navigating.
        ◦ "Next" button saves data and navigates to the next screen ("Address & Contact Details").
        ◦ The "Next" button is initially disabled until all required fields are valid.
        ◦ "GS Report" button generates a PDF summary of onboarding details (Personal Details, Contact Info, Onboarding Status, Assigned Departments) after validating data availability. Displays "Unable to generate GS Report: Incomplete Onboarding data" if data is missing.
        ◦ "HOB Report" button generates a PDF of the agent's historical business engagements (Previous Roles, Past Performance Metrics, Client Feedback Summaries) after validating data availability. Displays "HOB Report generation failed: No historical business data found" if data is missing.
        ◦ Mandatory fields are indicated with an asterisk (*).
        ◦ User-friendly inline error messages are displayed for validation failures (e.g., "Last Name is required and must contain only alphabets.").
        ◦ NIC No. must be unique across all client records.
        ◦ Age must be ≥18 years as of the current date.
    • Technical Requirements:
        ◦ API endpoint for PUT (update) personal details.
        ◦ Dynamic population of dropdowns from backend configurations.
        ◦ Client-side validation for character limits, formats, and required fields.
        ◦ Backend validation for NIC uniqueness and age verification.
        ◦ Integration for generating GS and HOB reports (PDF format).
User Story 2.2: Capture Address & Contact Details
    • As a HOB
    • I want to enter the address and contact details of the agent
    • So that accurate and complete communication details are recorded.
    • Acceptance Criteria:
        ◦ The "Address & Contact Details" screen is displayed after navigating from "Personal Details."
        ◦ The screen allows entry for Permanent Address and Correspondence Address.
        ◦ Fields include: Address Line 1 (Text, max 50), Address Line 2 (Text, max 50), City/Town (Text, max 30), Province (Dropdown), District (Dropdown), D. Secretariat (Dropdown), Electorate (Dropdown), Grama Niladari (Dropdown), Postal Code (Dropdown).
        ◦ A "Corresponding address is the same as the permanent address" checkbox copies data.
        ◦ Contact Information fields: Email (Text, max 50), Home (Text, max 10 numeric), Mobile (Text, max 10 numeric), WhatsApp (Text, max 10 numeric), Emergency (Text, max 10 numeric).
        ◦ "Save" button allows saving progress.
        ◦ "Next" button saves data and navigates to "Educational Qualification."
        ◦ The "Next" button is initially disabled until all required fields are valid.
        ◦ Mandatory fields are indicated with an asterisk (*).
        ◦ User-friendly inline error messages are displayed for validation failures (e.g., "Please enter a valid email address").
    • Technical Requirements:
        ◦ API endpoint for PUT (update) address and contact details.
        ◦ Dynamic population of dropdowns based on country/province.
        ◦ Client-side validation for character limits, numeric inputs, and email format.
EPIC 3: Agent Qualifications & Experience
User Story 3.1: Capture Educational Qualification
    • As a HOB
    • I want to capture, view, and verify an agent’s educational qualifications
    • So that I can evaluate their credentials.
    • Acceptance Criteria:
        ◦ The "Educational Qualification" screen is displayed after "Address & Contact Details."
        ◦ The screen includes radio buttons for: G.C.E. O/L (Pass/Done vs Fail/Not Done), G.C.E. A/L (Pass/Done vs Fail/Not Done), Diploma (Pass/Done vs Fail/Not Done), Degree (Pass/Done vs Fail/Not Done).
        ◦ Dropdowns for O/L English Grade (A, B, C, S, W) and O/L Maths Grade (A, B, C, S, W) are displayed.
        ◦ Checkboxes for Degree Category: Degree in HR, Banking & Insurance, Sales & Marketing, ICT.
        ◦ Toggles for Extracurricular Activities (Yes/No) and Second Language (Sinhala/Tamil) (Yes/No).
        ◦ If G.C.E. O/L is "Fail/Not Done," "O/L English Grade" and "O/L Maths Grade" dropdowns are greyed out, preventing selection, with a tooltip: "Grade not applicable for 'Not Done.'"
        ◦ "[Save & Continue]" button is enabled only when all mandatory validations pass.
        ◦ "[Navigate Back]" button takes the user to the previous screen.
        ◦ Inline red error text is displayed for blank or invalid required fields (e.g., "This field is required.").
    • Technical Requirements:
        ◦ API endpoint for PUT (update) educational qualifications.
        ◦ Client-side conditional logic to enable/disable grade dropdowns based on O/L status.
        ◦ Backend validation for logical consistency of selections.
User Story 3.2: Capture Work Experience
    • As a HOB
    • I want to capture, view, and verify an agent/applicant’s previous work experience
    • So that I can assess their background.
    • Acceptance Criteria:
        ◦ The "Work Experience" screen is displayed after "Educational Qualification."
        ◦ A "Previous Work Experience" toggle (Yes/No) controls visibility of subsequent fields.
        ◦ If "No," all subsequent fields are hidden, and "Save & Continue" is enabled (assuming prior validations passed).
        ◦ If "Yes," the following fields are displayed:
            ▪ Duration (Dropdown: Less than 2 yrs, More than 2 yrs, More than 3 yrs, More than 5 yrs).
            ▪ "Previous Experience at an Insurance Company" toggle (Yes/No).
            ▪ If "Yes" for insurance experience, show: Name of Employer & Branch (Text), Position Held (Text), Period Worked (From/To - Date Pickers), Contact No. (Text, 10 numeric).
            ▪ If "No" for insurance experience, experience fields are hidden.
        ◦ "[Save & Continue]" button is enabled only when all mandatory validations pass.
        ◦ "[Navigate Back]" button takes the user to the previous screen.
        ◦ Inline red error text for blank/invalid required fields (e.g., "This field is required.").
        ◦ For date validations, "'Period Worked – To' must be later than or equal to 'From.'"
        ◦ For numeric contact, "Enter a valid 10-digit contact number."
    • Technical Requirements:
        ◦ API endpoint for PUT (update) work experience details.
        ◦ Client-side conditional rendering logic for fields based on toggles.
        ◦ Backend validation for date logic and contact number format.
User Story 3.3: Capture Bank Details
    • As a HOB
    • I want to add or update the Bank details
    • So that commission processing can be facilitated.
    • Acceptance Criteria:
        ◦ The "Bank Details" screen is displayed after "Work Experience Details."
        ◦ The screen includes mandatory fields: Bank (Dropdown), Branch (Dropdown, dependent on Bank), Account Type (Dropdown: Savings, Current), Account Number (Text).
        ◦ A "Passbook" button allows uploading a PDF file.
        ◦ The "Next" button stores details and checks validations.
        ◦ The "Save" button saves changes.
        ◦ The "Previous" button navigates back without saving bank details.
        ◦ Validation for Bank, Branch, Account Type: must be selected (e.g., "Please select a bank.").
        ◦ Account Number: must be numeric only, 10-18 digits in length, and unique (e.g., "This account number is already used.").
        ◦ Passbook Upload: accepts only .pdf files, max 1MB. Displays "Invalid file type or size exceeded" for invalid files.
        ◦ Passbook must clearly show: User's name, Account number, Bank name/branch.
        ◦ Data should be securely saved and encrypted.
    • Technical Requirements:
        ◦ API endpoint for PUT (update) bank details.
        ◦ API endpoint for file upload (/upload/passbook).
        ◦ Client-side validation for dropdown selections, account number format/length, and file type/size.
        ◦ Backend validation for account number uniqueness and file security.
        ◦ Encryption for sensitive bank data at rest and in transit.
User Story 3.4: Capture Exam Details Information
    • As a HOB
    • I want to fill Exam Details Information
    • So that agent eligibility can be ensured.
    • Acceptance Criteria:
        ◦ The "Exam Details" screen is displayed after "Bank Details."
        ◦ All fields on this page are configurable (based on JSON format).
        ◦ The screen allows checking/unchecking questions related to IBSL Exam completed in another company.
        ◦ Fields for IBSL Exam Details: Examination Date (DD/MM/YY Time AM/PM), Admission No (Text Box - Number Only), Marks Obtained (Text Box - Number Only), Center (Text Box).
        ◦ Self-Paced Section fields: AML(FIU) Test (Text Box), TAP Result (Text Box).
        ◦ Pre-Contract Exam Data fields: Examination Data (DD/MM/YY), NIC No (Text Box - Number Only), Marks Obtained (Text Box - Number Only), Centre (Text Box).
        ◦ O/L Examination Index Number & Year (up to three entries): Index number (Text Box - Number Only), Year (Dropdown).
        ◦ "Back" button moves to the previous page ("Bank Details") without saving current data.
        ◦ "Save" button saves partially or completely filled data.
    • Technical Requirements:
        ◦ API endpoint for PUT (update) exam details.
        ◦ Backend configuration for dynamic UI generation based on JSON schema.
        ◦ Client-side validation for numeric-only inputs and date formats.
User Story 3.5: Capture Work Station Details
    • As a HOB
    • I want to capture and validate the agent’s workstation details
    • So that agent mapping can be facilitated.
    • Acceptance Criteria:
        ◦ The "Work Station Details" screen is displayed after "Exam Details."
        ◦ The screen includes mandatory dropdowns: Group/Department, Sub Dep/Cluster (dependent on Group/Department), Branch (dependent on Sub Dep/Cluster), Unit (dependent on Branch).
        ◦ Supervisor Name (Dropdown) is dependent on the selected Unit.
        ◦ "Introduced by SO" (Radio button: Yes/No).
        ◦ If "Introduced by SO" is "Yes," then "Introduced By (SO Code)" (Text field) becomes mandatory and must be a valid SO code.
        ◦ If "Introduced by SO" is "No," "Introduced By (SO Code)" is disabled or optional and must be blank or validated not to interfere.
        ◦ "Save" button is enabled only when all required fields are valid.
        ◦ Error prompts for missing or invalid data are displayed inline.
    • Technical Requirements:
        ◦ API endpoint for PUT (update) workstation details.
        ◦ Dynamic population of cascading dropdowns from backend configurations.
        ◦ Client-side conditional logic for "Introduced By (SO Code)" field.
        ◦ Backend validation for valid SO code.
User Story 3.6: Capture Hospitalization Benefit Details
    • As a HOB
    • I want to enter and manage dependent information for hospitalization benefits
    • So that all relevant personal, medical, and eligibility-related data can be captured.
    • Acceptance Criteria:
        ◦ The "Hospitalization Benefit Details" screen is displayed after "Work Station Details."
        ◦ The screen includes fields for dependents: Relationship (Dropdown), NIC No (Text), Gender (Dropdown), Date of Birth (Date picker), Title (Dropdown), Initials (Text, max 10), Surname (Text, max 50), Name Denominated by Initials (Text, max 50), Employment (Dropdown), Medical Cover Provided (Dropdown).
        ◦ "Save" button allows saving progress.
        ◦ "Next" button saves data and navigates to the next screen ("Document Upload").
        ◦ "Previous" button navigates back to "Work Station Details" without saving current data.
        ◦ The "Next" button is initially disabled until all required fields are valid.
        ◦ Mandatory fields are indicated with an asterisk (*).
        ◦ User-friendly inline error messages are displayed (e.g., "Surname is required and must contain only alphabets.").
        ◦ NIC No. must be unique across all client records.
    • Technical Requirements:
        ◦ API endpoint for PUT (update) hospitalization benefit details.
        ◦ Dynamic population of dropdowns from backend configurations.
        ◦ Client-side validation for character limits, date formats, and required fields.
        ◦ Backend validation for NIC uniqueness.
EPIC 4: Document & Legal Compliance
User Story 4.1: Upload Supporting Documents
    • As a HOB
    • I want to upload images/documents during the Onboarding process
    • So that all necessary supporting documents are attached to the application.
    • Acceptance Criteria:
        ◦ The "Document Upload" screen is displayed after "Hospitalization Benefit."
        ◦ Each document type (e.g., NIC/Driving License/Passport, Photograph, Bank Passbook, GS Report, HOB/MBD Report, Initial Interview Guide, Group Annuity Form) has:
            ▪ A file upload input ("Choose File").
            ▪ A "View" button to preview the uploaded file.
            ▪ File type restrictions (e.g., .jpg, .pdf).
            ▪ A 1MB max size rule.
        ◦ "NIC/Driving License/Passport" is mandatory (one of these).
        ◦ "Photograph" is required for profile.
        ◦ "Bank Passbook" is required for salary verification.
        ◦ "GS Report" is a required internal report.
        ◦ "HOB/MBD Report" is based on internal need.
        ◦ "View" buttons are enabled only after a file is uploaded and open the file in a new browser tab or preview modal.
        ◦ Clear error messages are displayed for unsupported file types or files exceeding the size limit.
        ◦ "Back," "Save," and "Next" buttons are available.
        ◦ "Save" stores uploaded files temporarily or to the server.
        ◦ "Next" proceeds to the next screen after all mandatory files are validated.
    • Technical Requirements:
        ◦ API endpoint for file uploads (POST /documents/upload).
        ◦ Backend validation for file types, sizes, and content security (virus scanning).
        ◦ Client-side validation for file types and sizes.
        ◦ Integration with a Core File System for secure document storage.
        ◦ Frontend component for file selection, preview, and progress indication.
User Story 4.2: Capture Witness Details & Terms and Conditions
    • As a HOB
    • I want to enter and submit witness details, Terms and Conditions, and Signature
    • So that my application can be processed with valid verification and legal compliance.
    • Acceptance Criteria:
        ◦ The "Witness Details & Terms and Conditions" screen is displayed after "Document Upload."
        ◦ Fields for two witnesses: Name, NIC, and Address. All are mandatory.
        ◦ Witness NIC must follow a valid format (e.g., XXXXXXXXXV).
        ◦ User must confirm acceptance of policies (Agent Agreement, Code of Conduct, Anti-Corruption Policy, Anti-Money Laundering, etc.) by checking a box.
        ◦ A digital signature file must be uploaded (JPG or JPEG formats only).
        ◦ The system displays an error if an unsupported signature file format is uploaded.
        ◦ "Back," "Save," and "Next" buttons are available.
        ◦ "Save" stores uploaded files temporarily or to the server.
        ◦ "Next" proceeds to the "Average Recruitment Indicator (ARI)" screen after all mandatory fields and validations pass.
    • Technical Requirements:
        ◦ API endpoint for PUT (update) witness details and policy acceptance.
        ◦ API endpoint for digital signature upload.
        ◦ Backend validation for NIC format, mandatory fields, and signature file type.
        ◦ Secure storage of digital signature.
EPIC 5: ARI Assessment & Application Submission
User Story 5.1: View Average Recruitment Indicator (ARI) Report
    • As a Head of Branch (HOB)
    • I want to view a calculated Average Recruitment Indicator (ARI) score
    • So that I can make an informed decision to accept or reject the agent applicant.
    • Acceptance Criteria:
        ◦ The "ARI Report" screen is displayed after completing all previous "Agent Onboarding Application" sections.
        ◦ The screen displays a table with 10 eligibility categories, each pulling its value from previous sections.
        ◦ The system auto-calculates and displays a "Points" value for each category.
        ◦ A "Total score" (sum of all 10 categories) is shown at the bottom of the table.
        ◦ Below the ARI section, the "PEP (Politically Exposed Person) question" is displayed (Yes/No options). This question and screen are configurable from the server.
        ◦ The user is presented with three buttons: [Back], [Send], [Reject].
        ◦ If "Total Score" is < 30, the system displays "Minimum ARI score of 30 required to proceed." and prevents [Send].
        ◦ If PEP is not selected, the system displays "Please select your PEP status before submitting." and prevents [Send].
        ◦ If [Reject] is clicked (future logic), a rejection reason may be required.
        ◦ If input is missing in previous sections, affected ARI fields show "0" or "Incomplete," and the user is blocked from proceeding until upstream sections are completed.
    • Technical Requirements:
        ◦ API endpoint for GET /ari-score to calculate and retrieve ARI based on application data.
        ◦ Backend logic for ARI score calculation based on predefined mapping (Civil Status, Age, Education, O/L Maths, O/L English, Work Experience, Having Children, Introduced SO Age, Scouts/Prefect/etc., Second Language).
        ◦ Backend configuration for ARI scoring methodology and threshold.
        ◦ Client-side display of ARI table and dynamic updates.
        ◦ API endpoint for fetching PEP question configuration.
User Story 5.2: Submit Application for Approval & Sales Code Generation
    • As a HOB
    • I want to submit/send the application for approval
    • So that the agent can proceed to sales code activation.
    • Acceptance Criteria:
        ◦ The HOB clicks the [Send] button on the "Average Recruitment Indicator" screen.
        ◦ Post-submission, the application is sent for approval to MBD/SMBD/LOP/Agent Admin based on predefined rules:
            ▪ If ARI score < 30, application is sent back to HOB (with an option to send to MBD for potential check).
            ▪ If ARI score ≥30, candidate is accepted by Agency Admin.
            ▪ If agent is below 25 years old, application can be sent to Most Senior MBD for approval, with a comment field.
            ▪ If candidate is over 50 years old, a medical report is required (uploaded by HOB), sent to the operation department for approval. Relevant officer picks comments based on medical recommendation and informs HOB, LOP, MBD.
            ▪ Application confirmed by LOP passes to Agency Admin.
        ◦ Upon successful submission, a "Your application has been submitted and is under review" message is displayed.
        ◦ Approval notification is sent to LOP, MBD, SMBD, AA via email and SMS.
        ◦ If approved by MBD, the Sales code is generated the next day, and data is passed to HRIM and other related systems.
        ◦ If the application is rejected, HOB is notified via email & SMS.
    • Technical Requirements:
        ◦ API endpoint for POST /submit-application.
        ◦ Backend workflow engine for multi-level approvals based on ARI score, age, and other criteria.
        ◦ Integration with NotificationSvc for email/SMS notifications.
        ◦ Integration with HRIM and other core systems for sales code generation and data transfer.
        ◦ Server-side validations: Duplicate Application Check, MBD Response Integrity, Approval Check Before Sales Code Generation, File Security Check (for uploads), Authorization.
User Story 5.3: Confirm Agent Agreement Post-Approval
    • As a user (HOB)
    • I want to confirm the agent agreement digitally post-approval
    • So that the agent can be fully activated.
    • Acceptance Criteria:
        ◦ The "Agent Agreement" screen is enabled only after a Sales Code is available for the application.
        ◦ HOB can click on the record from the Summary Page (once Sales Code is generated) to land on the "Agent Agreement Page."
        ◦ The "Agent Agreement Page" displays the Sales Code, Application Number, and agreement conditions.
        ◦ The page includes a digital signature section for the Agent to sign.
        ◦ Post-signature, HOB needs to upload the signed agreement to the HRIS System.
        ◦ "Submit" button enables submission of data for approval & core system.
    • Technical Requirements:
        ◦ API endpoint for GET /agent-agreement/{applicationId} to retrieve agreement details.
        ◦ API endpoint for POST /agent-agreement/{applicationId}/sign to capture digital signature.
        ◦ API endpoint for POST /agent-agreement/{applicationId}/upload-to-hris for agreement upload.
        ◦ Integration with HRIS for agreement upload.
        ◦ Frontend component for digital signature capture.
6. Technical Specifications
6.1 Data Models
    • AgentApplication:
        ◦ applicationNumber: String (generated, unique)
        ◦ salesCode: String (generated, Optional)
        ◦ applicantName: String
        ◦ designation: String
        ◦ status: Enum (Draft, Pending Submission, Rejected, Submitted, Approved)
        ◦ currentApprovalStage: Enum (HOB, MBD, SMBD, LOP, AA, etc.)
        ◦ createdAt: DateTime
        ◦ lastModified: DateTime
    • PersonalDetails:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ designation: String
        ◦ title: String
        ◦ initials: String (max 10)
        ◦ firstName: String (max 50)
        ◦ lastName: String (max 50)
        ◦ nameByInitials: String (max 50)
        ◦ civilStatus: String
        ◦ havingChildren: Boolean
        ◦ nationality: String
        ◦ dateOfBirth: Date (YYYY-MM-DD)
        ◦ passportNo: String (max 9, Alphanumeric, Optional)
        ◦ rejoin: String (Optional)
        ◦ preferredLanguage: String (Optional)
        ◦ nicNo: String (unique)
        ◦ takafulAgent: Boolean (Optional)
    • AddressContactDetails:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ permanentAddressLine1: String (max 50)
        ◦ permanentAddressLine2: String (max 50, Optional)
        ◦ permanentCityTown: String (max 30)
        ◦ permanentProvince: String
        ◦ permanentDistrict: String
        ◦ permanentDSecretariat: String
        ◦ permanentElectorate: String
        ◦ permanentGramaNiladari: String
        ◦ permanentPostalCode: String
        ◦ isCorrespondenceSameAsPermanent: Boolean
        ◦ correspondenceAddressLine1: String (max 50, Conditional)
        ◦ correspondenceAddressLine2: String (max 50, Optional, Conditional)
        ◦ correspondenceCityTown: String (max 30, Conditional)
        ◦ correspondenceProvince: String (Conditional)
        ◦ correspondenceDistrict: String (Conditional)
        ◦ correspondenceDSecretariat: String (Conditional)
        ◦ correspondenceElectorate: String (Conditional)
        ◦ correspondenceGramaNiladari: String (Conditional)
        ◦ correspondencePostalCode: String (Conditional)
        ◦ email: String (max 50)
        ◦ contactHome: String (max 10, numeric, Optional)
        ◦ contactMobile: String (max 10, numeric)
        ◦ contactWhatsApp: String (max 10, numeric, Optional)
        ◦ contactEmergency: String (max 10, numeric, Optional)
    • EducationalQualification:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ gceOLStatus: Enum (Pass/Done, Fail/Not Done)
        ◦ gceALStatus: Enum (Pass/Done, Fail/Not Done)
        ◦ diplomaStatus: Enum (Pass/Done, Fail/Not Done)
        ◦ degreeStatus: Enum (Pass/Done, Fail/Not Done)
        ◦ olEnglishGrade: Enum (A, B, C, S, W, Optional)
        ◦ olMathsGrade: Enum (A, B, C, S, W, Optional)
        ◦ degreeCategory: Array of Strings (HR, Banking & Insurance, Sales & Marketing, ICT, Optional)
        ◦ extracurricularActivities: Boolean (Optional)
        ◦ secondLanguage: Boolean (Optional)
    • WorkExperience:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ hasPreviousWorkExperience: Boolean
        ◦ duration: String (Enum: Less than 2 yrs, More than 2 yrs, More than 3 yrs, More than 5 yrs, Conditional)
        ◦ hasInsuranceExperience: Boolean (Conditional)
        ◦ employerNameBranch: String (Conditional)
        ◦ positionHeld: String (Conditional)
        ◦ periodWorkedFrom: Date (YYYY-MM-DD, Conditional)
        ◦ periodWorkedTo: Date (YYYY-MM-DD, Conditional)
        ◦ employerContactNo: String (max 10, numeric, Conditional)
    • BankDetails:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ bankName: String
        ◦ bankBranch: String
        ◦ accountType: Enum (Savings, Current)
        ◦ accountNumber: String (10-18 digits, numeric, unique)
        ◦ passbookFileId: String (FK to Document, Optional)
    • ExamDetails:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ ibslExams: Array of Objects (Configurable JSON structure)
            ▪ examName: String
            ▪ examinationDate: DateTime
            ▪ admissionNo: String (numeric)
            ▪ marksObtained: Number (numeric)
            ▪ center: String
        ◦ selfPacedSection: Object
            ▪ amlFiuTest: String
            ▪ tapResult: String
        ◦ preContractExamData: Object
            ▪ examinationData: Date (DD/MM/YY)
            ▪ nicNo: String (numeric)
            ▪ marksObtained: Number (numeric)
            ▪ centre: String
        ◦ olExamIndexes: Array of Objects (max 3 entries)
            ▪ indexNumber: String (numeric)
            ▪ year: String
    • WorkStationDetails:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ groupDepartment: String
        ◦ subDepCluster: String
        ◦ branch: String
        ◦ unit: String
        ◦ supervisorName: String
        ◦ introducedBySO: Boolean
introducedBySOCode: String (Conditional)

    • HospitalizationBenefit:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ dependents: Array of Objects
            ▪ relationship: String
            ▪ nicNo: String (unique per dependent)
            ▪ gender: String
            ▪ dateOfBirth: Date (DD/MM/YYYY)
            ▪ title: String
            ▪ initials: String (max 10)
            ▪ surname: String (max 50)
            ▪ nameByInitials: String (max 50)
            ▪ employment: String
            ▪ medicalCoverProvided: String
    • Document:
        ◦ documentId: String (generated, unique)
        ◦ applicationId: String (FK to AgentApplication)
        ◦ documentType: Enum (NIC/Driving License/Passport, Photograph, Bank Passbook, GS Report, HOB/MBD Report, Initial Interview Guide, Group Annuity Form, Medical Report, Agent Agreement)
        ◦ fileName: String
        ◦ fileType: String (e.g., .jpg, .pdf)
        ◦ fileSize: Number (in bytes)
        ◦ fileStoragePath: String (URL or path in Core File System)
        ◦ uploadedAt: DateTime

    • WitnessDetails:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ witnesses: Array of Objects (for two witnesses)
        ◦ name: String
        ◦ nic: String
        ◦ address: String
        ◦ policiesAccepted: Boolean
        ◦ digitalSignatureFileId: String (FK to Document)

    • ARIReport:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ civilStatusScore: Number
        ◦ ageScore: Number
        ◦ educationScore: Number
        ◦ olMathsScore: Number
        ◦ olEnglishScore: Number
        ◦ workExperienceScore: Number
        ◦ childrenScore: Number
        ◦ introducerAgeScore: Number (Optional, future)
        ◦ extracurricularScore: Number
        ◦ secondLanguageScore: Number
        ◦ totalScore: Number
        ◦ pepStatus: Boolean
    • AgentAgreement:
        ◦ applicationId: String (FK to AgentApplication)
        ◦ salesCode: String
        ◦ agreementConditions: String (text of agreement)
        ◦ digitalSignatureFileId: String (FK to Document)
        ◦ signedAt: DateTime
        ◦ uploadedToHRISAt: DateTime (Optional)
6.2 API Endpoints
    • Base URL: /api/v1/onboarding
    • GET /applications: Get all applications (with filters)
    • GET /applications/{applicationId}: Get single application details
    • POST /applications: Create new application
    • DELETE /applications/{applicationId}: Delete application
    • PUT /applications/{applicationId}/personal-details: Save personal details
    • PUT /applications/{applicationId}/address-contact: Save address & contact details
    • PUT /applications/{applicationId}/educational-qualification: Save educational qualification
    • PUT /applications/{applicationId}/work-experience: Save work experience
    • PUT /applications/{applicationId}/bank-details: Save bank details
    • PUT /applications/{applicationId}/exam-details: Save exam details
    • PUT /applications/{applicationId}/workstation-details: Save workstation details
    • PUT /applications/{applicationId}/hospitalization-benefit: Save hospitalization benefit
    • POST /applications/{applicationId}/documents/upload: Upload document
    • GET /applications/{applicationId}/documents/{documentId}: View uploaded document
    • PUT /applications/{applicationId}/witness-details-terms: Save witness details & T&C
    • GET /applications/{applicationId}/ari-report: Get ARI report
    • POST /applications/{applicationId}/submit: Submit application for approval
    • POST /applications/{applicationId}/approve: Approve application (for MBD/SMBD/LOP/AA)
    • POST /applications/{applicationId}/reject: Reject application (for MBD/SMBD/LOP/AA)
    • GET /applications/{applicationId}/agent-agreement: Get agent agreement details
    • POST /applications/{applicationId}/agent-agreement/sign: Capture digital signature for agreement
    • POST /applications/{applicationId}/agent-agreement/upload-to-hris: Upload signed agreement to HRIS
    • GET /config/dropdowns/{type}: Get dropdown configurations (e.g., designations, nationalities, provinces, banks, etc.)
    • GET /reports/gs-report/{applicationId}: Generate GS Report
    • GET /reports/hob-report/{applicationId}: Generate HOB Report
6.3 Validation Rules
    • General:
        ◦ All fields marked with an asterisk (*) are mandatory.
        ◦ User-friendly inline error messages for validation failures.
    • Personal Details:
        ◦ nicNo: Must be unique across all client records.
        ◦ Age calculated from dateOfBirth must be ≥18 years.
        ◦ Character limits enforced for text fields.
        ◦ dateOfBirth: DD/MM/YYYY format.
    • Address & Contact Details:
        ◦ email: Must be a valid email format.
        ◦ Contact numbers (Home, Mobile, WhatsApp, Emergency): Must be 10 numeric characters.
    • Educational Qualification:
        ◦ olEnglishGrade, olMathsGrade: Only enabled if gceOLStatus is "Pass/Done."
        ◦ Logical consistency checks for selections (e.g., can't have A/L Pass if O/L Fail).
    • Work Experience:
        ◦ periodWorkedTo must be later than or equal to periodWorkedFrom.
        ◦ employerContactNo: Must be 10 numeric characters.
    • Bank Details:
        ◦ bankName, bankBranch, accountType: Must be selected.
        ◦ accountNumber: Numeric only, 10-18 digits, unique.
        ◦ passbookFile: .pdf only, max 1MB. Content validation (user name, account number, bank name).
    • Exam Details:
        ◦ Numeric fields (Admission No, Marks Obtained, Index number): Numeric only.
        ◦ Date fields: DD/MM/YY format.
    • Work Station Details:
        ◦ All dropdowns are required and must have valid selections.
        ◦ supervisorName: Must be selected.
        ◦ If introducedBySO is "Yes," then introducedBySOCode is mandatory and must be a valid SO code.
    • Hospitalization Benefit:
        ◦ nicNo (for dependent): Must be unique across all client records (for dependents).
    • Document Upload:
        ◦ File types restricted per document type (.jpg, .pdf).
        ◦ File size must not exceed 1MB.
        ◦ "NIC/Driving License/Passport" and "Photograph" are mandatory uploads.
    • Witness Details & Terms and Conditions:
        ◦ All witness fields (Name, NIC, Address) are required.
        ◦ Witness NIC: Must follow valid format (e.g., XXXXXXXXXV).
        ◦ All policy acceptance checkboxes must be checked.
        ◦ Digital signature file: .jpg or .jpeg only.
    • ARI Report & Submission:
        ◦ Minimum ARI total score of 30 required for submission.
        ◦ PEP status must be selected (Yes/No).
        ◦ All previous application sections must be completed before submission.
        ◦ Server-side: Duplicate Application Check, MBD Response Integrity, Approval Check Before Sales Code Generation, File Security Check (for uploads), Authorization.
7. User Interface Requirements
7.1 Design Principles
    • Clean, professional, and intuitive interface for complex data entry.
    • Consistent navigation patterns across all 13 application stages.
    • Clear visual hierarchy with proper spacing and logical grouping of fields.
    • Responsive design for various screen sizes (desktop and tablet).
    • Accessibility compliance (WCAG 2.1 AA).
    • Progressive disclosure for complex sections (e.g., conditional fields in Work Experience).
7.2 Common UI Elements
    • Primary buttons: [Save], [Next], [Send], [Reject], [Submit]
    • Secondary buttons: [Back], [New Application], [Edit Application], [Delete Application], [Search], [GS Report], [HOB Report], [Add a Nominee], [Bulk Upload Nominee], [Passbook Upload]
    • Required field indicator: Red asterisk (*)
    • Error messages: Red text below field or prominent notification banners.
    • Success messages: Green notification banners.
    • Loading states: Spinner with descriptive text during data operations.
    • Date Pickers: For all date input fields (DD/MM/YYYY format).
    • Dropdowns: Dynamically populated from backend, searchable where lists are long.
    • Textboxes: With specified character limits and placeholder text.
    • Radio Buttons: For binary choices.
    • Checkboxes: For multiple selections (e.g., Degree Category) or policy acceptance.
    • Toggles: For Yes/No options (e.g., Extracurricular Activities, Previous Work Experience).
    • File Upload Inputs: With "Choose File" button and "View" button for preview.
    • Grids/Tables: For displaying lists of applications, ARI categories, etc., with pagination and sorting.
    • Digital Signature Pad/Upload Area: For capturing agent's signature.
7.3 Form Layout
    • Multi-stage form flow, guiding the user sequentially through sections.
    • Logical grouping of related fields within each screen.
    • Clear section headers and descriptions.
    • Consistent field sizing and alignment.
    • Progress bar or indicator to show current stage in the onboarding process.
8. Success Metrics
8.1 Functional Metrics
    • Application Completion Rate: >90% (applications initiated that reach "Submitted" or "Approved" status).
    • Data Validation Error Rate: <5% (errors encountered during data entry that are not immediately corrected).
    • ARI Calculation Accuracy: 100% (ARI score correctly calculated based on input data and rules).
    • Sales Code Generation Success Rate: 100% for approved applications.
    • Document Upload Success Rate: >98% (successful uploads without format/size errors).
8.2 Performance Metrics
    • Page Load Time: <3 seconds for all main screens.
    • Form Save Time: <2 seconds per section.
    • Application Submission Time: <5 seconds (excluding external API response times).
    • Report Generation Time (GS/HOB): <5 seconds.
    • System Uptime: 99.5%.
8.3 User Experience Metrics
    • Average Onboarding Time: <5 business days per agent.
    • User Task Completion Time (HOB - full application): <30 minutes.
    • Error Resolution Time: <1 minute (time taken for user to correct errors based on feedback).
    • User Satisfaction Score: >4.0/5.0.
9. Assumptions & Dependencies
9.1 Assumptions
    • Users (HOB, MBD, SMBD, LOP, AA) have basic computer literacy and access to necessary devices.
    • Stable internet connection is available for backend synchronization and external API calls.
    • Agent master data (including NIC, employment details, etc.) is accurately maintained and accessible within the AMS database.
    • User roles and permissions are configured in the parent AMS and govern access rights within this module.
    • All prerequisite external systems (LMS, IASL, Core System, SAP, SMS/Email gateway) are available, accessible via APIs, and configured for use.
    • Dropdown configurations (Designations, Titles, Civil Status, Nationalities, Bank Names, Branches, Account Types, Exam names, Workstation Groups/Departments, Relationships, Employment, Medical Cover options) are managed via a backend configuration API.
    • Digital signature capture can be integrated via a standard component or API.
9.2 Dependencies
    • Backend API development for all defined endpoints.
    • Database schema implementation for all entities (AgentApplication, PersonalDetails, etc.).
    • Integration with existing AMS authentication and authorization system.
    • Integration with Notification Gateway (SMS/Email).
    • Integration with LMS (Learning Management System) for pre-contract/FIU checks.
    • Integration with IASL (Internal Agent Screening List) for blacklist checks.
    • Integration with Core System for sales code activation and data transfer.
    • Integration with SAP for financial/HR data.
    • Development of reusable UI components (e.g., Date Pickers, Cascading Dropdowns, File Uploaders, Digital Signature Pad).
    • Core File System for secure document storage.
10. Risk Analysis
10.1 Technical Risks
    • Data Loss/Inconsistency: Implement robust local storage and backend synchronization with conflict resolution. Maintain consistent validation rules across frontend and backend.
    • Performance Issues: Optimize form rendering, API calls, and data processing, especially for bulk operations and report generation.
    • Integration Challenges: Thorough API documentation, robust error handling, and retry mechanisms for external system integrations.
    • Security Vulnerabilities: Implement proper encryption for sensitive data (bank details, NIC), secure file uploads (virus scanning, MIME type enforcement), and strict access controls.
    • Scalability: Design the system to handle a growing number of agents and applications without performance degradation.
10.2 Business Risks
    • User Adoption: Provide comprehensive training and support to HOBs and other users. Ensure an intuitive and user-friendly interface.
    • Compliance: Ensure all legal and regulatory requirements (e.g., age verification, document retention, data privacy) are met and can be updated as regulations evolve.
    • Data Accuracy: Implement strong validation rules and clear user feedback to minimize data entry errors.
    • Process Change Management: Clearly communicate the benefits of the new system and manage the transition from manual processes.
11. Implementation Guidelines for Code Generation Models
11.1 Development Approach
    • Implement each User Story as an independent, modular component, facilitating parallel development.
    • Adhere to a consistent naming convention across all components, functions, and variables for clarity and maintainability.
    • Implement comprehensive client-side validation to provide immediate feedback, complemented by robust server-side validation for data integrity.
    • Follow defensive programming practices to anticipate and handle edge cases, invalid inputs, and system failures gracefully.
    • Prioritize fully responsive design using relative units and responsive frameworks (e.g., Tailwind CSS) to ensure optimal viewing and usability on all devices (desktop, tablet).
11.2 Code Organization
    • /src
        ◦ /components
            ▪ /OnboardingSummary
            ▪ /PersonalDetails
            ▪ /AddressContactDetails
            ▪ /EducationalQualification
            ▪ /WorkExperience
            ▪ /BankDetails
            ▪ /ExamDetails
            ▪ /WorkStationDetails
            ▪ /HospitalizationBenefit
            ▪ /DocumentUpload
            ▪ /WitnessDetailsTerms
            ▪ /ARIReport
            ▪ /AgentAgreement
            ▪ /common (reusable UI elements like buttons, inputs, modals, tables, date pickers)
        ◦ /services (business logic, data orchestration, API calls)
            ▪ /api (defines API interfaces and handles HTTP requests)
            ▪ /validation (client-side validation utilities)
            ▪ /storage (local database interactions, e.g., IndexedDB)
            ▪ /utils (helper functions: date formatting, ARI calculations, data transformations)
        ◦ /types (TypeScript interfaces/Flow types for data models and component props)
        ◦ /models (Backend data models definitions, potentially shared with frontend)
        ◦ /constants (configurable values, e.g., max lengths, file types)
11.3 Testing Requirements
    • Unit Tests: Develop comprehensive unit tests for all validation functions, ARI scoring logic, utility functions, and core business rules.
    • Integration Tests: Implement integration tests for end-to-end form workflows (e.g., Personal Details -> Address -> Educational Qual.), ensuring data persistence and correct data flow between components and API calls.
    • End-to-End Tests: Create end-to-end tests for complete user journeys, simulating real user interactions from application initiation to sales code generation and agreement signing, covering all approval paths.
    • Error Scenario Testing: Rigorously test error handling for invalid inputs, network failures, API errors, and edge cases (e.g., NIC uniqueness violation, age validation failure, file upload errors).
    • Performance Testing: Conduct performance tests for critical operations such as loading application summaries, saving large forms, bulk document uploads, and ARI calculation to ensure adherence to defined metrics.
    • Security Testing: Include tests for authentication, authorization (role-based access), data encryption, and secure file handling to prevent vulnerabilities.