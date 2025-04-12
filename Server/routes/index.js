const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');

// Mount authentication routes at /api/auth
router.use('/api/auth', authRoutes);

// Mount task routes at /api/tasks
router.use('/api/tasks', taskRoutes);

module.exports = router;
