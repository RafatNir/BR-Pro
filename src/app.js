const express = require('express');

const authRoutes = require('./routes/authRoutes');
const businessRegistrationRoutes = require('./routes/businessRegistrationRoutes');
const taskRoutes = require('./routes/taskRoutes');
const documentRoutes = require('./routes/documentRoutes');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/business-registrations', businessRegistrationRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/documents', documentRoutes);

module.exports = app;
