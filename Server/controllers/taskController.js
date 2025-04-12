const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, createdBy: req.user.id });
    await task.save();
    res.status(201).json({ message: 'Task created', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    task.title = title || task.title;
    task.description = description || task.description;
    await task.save();

    res.json({ message: 'Task updated', task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.createdBy.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });
      const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });

      } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
