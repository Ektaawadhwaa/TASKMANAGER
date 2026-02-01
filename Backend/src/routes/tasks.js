import { Router } from 'express';
import Task from '../models/Task.js';
import protect from '../middlewares/auth.js';
import mongoose from 'mongoose';
const router = Router();
// All routes protected
router.use(protect);

// Get all tasks
router.get('/', async (req, res) => {
  try {
     const tasks = await Task.find({ user: req.user._id }).sort('-createdAt');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ message: 'Invalid task ID' });
}
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create task
router.post('/', async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user._id,
    status: req.body.status || 'pending'
  });
   res.status(201).json(task);

   
});

// Update task
router.put('/:id', async (req, res) => {
    const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
});

// Delete task
router.delete('/:id', async (req, res) => {
 const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  res.json({ message: 'Task deleted' });
});

export default router;