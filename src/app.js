// app.js

const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('../routes/postRoutes');
const authMiddleware = require('../middleware/authMiddleware');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Authentication
app.use('/posts', authMiddleware);

// Routes
app.use('/posts', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.SERVER_PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

