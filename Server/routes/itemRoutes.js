const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const jwt = require("jsonwebtoken");

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "secretekey");
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// GET all tasks for a user
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ createdBy: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// POST create task
router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  console.log(req.user)
  try {
    const newTask = new Task({ title, description, createdBy: req.user.id });
    const savedTask = await newTask.save();
    res.status(201).json({ message: "Task created", data: savedTask });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message });
  }
});

// ✅ DELETE task
router.delete("/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task deleted", data: deletedTask });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message });
  }
});

// ✅ PUT update task
router.put("/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
    res.status(200).json({ message: "Task updated", data: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message });
  }
});

// ✅ GET single task
router.get("/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to view this task" });
    }

    res.status(200).json({ message: "Task found", data: task });
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error: error.message });
  }
});

module.exports = router;
