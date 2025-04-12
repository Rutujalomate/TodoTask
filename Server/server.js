const express = require('express');
const app = express();
const connectDB = require('./config/db');
const routes = require('./routes');
require('dotenv').config();
const cors = require('cors');


// Enable CORS for all routes
app.use(cors());
// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Use the aggregated routes
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
