const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all tasks for the authenticated user
router.get('/', authMiddleware, getTasks);

// Create a new task
router.post('/', authMiddleware, createTask);

// Update an existing task
router.put('/:id', authMiddleware, updateTask);

// Delete a task
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
