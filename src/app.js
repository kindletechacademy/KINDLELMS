const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = config.get('port') || process.env.PORT;

// Middleware
app.use(express.json());

// Database Connection
mongoose.connect(config.get('mongoUri'), { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api', require('./routes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
