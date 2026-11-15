const Task = require('../models/Task');
const mongoose = require('mongoose');

const getValidObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return new mongoose.Types.ObjectId(id);
};

const pickAllowedFields = (payload, fields) => {
  const updates = {};

  fields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(payload, field)) {
      updates[field] = payload[field];
    }
  });

  return updates;
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user._id,
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const taskId = getValidObjectId(req.params.id);
    if (!taskId) {
      return res.status(400).json({ message: 'Invalid Task id' });
    }

    const task = await Task.findOne({ _id: taskId, createdBy: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = getValidObjectId(req.params.id);
    if (!taskId) {
      return res.status(400).json({ message: 'Invalid Task id' });
    }

    const updates = pickAllowedFields(req.body, ['title', 'description', 'dueDate', 'status']);

    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const taskId = getValidObjectId(req.params.id);
    if (!taskId) {
      return res.status(400).json({ message: 'Invalid Task id' });
    }

    const task = await Task.findOneAndDelete({ _id: taskId, createdBy: req.user._id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
