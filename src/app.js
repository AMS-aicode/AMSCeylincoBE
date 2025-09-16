const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Add this line to parse JSON bodies
const indexRouter = require('./routes/index');
const applicationsRouter = require('./routes/applications');
const configRouter = require('./routes/config');
const witnessRouter = require('./routes/witness');

app.use('/', indexRouter);
app.use('/api/v1/agent-onboarding/applications', applicationsRouter);
app.use('/api/v1/agent-onboarding/config', configRouter);
app.use('/api/v1/agent-onboarding/witness', witnessRouter);
app.use('/uploads', express.static(require('path').join(__dirname, '../uploads')));

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
