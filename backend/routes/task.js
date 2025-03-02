import express from 'express';
import Task from '../models/task.js';
import User from '../models/user.js'
import { verifyToken } from '../middleware/auth.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

router.post('/', verifyToken, catchAsync(async (req, res, next) => {
    const { title, description = "", due, status } = req.body;
    const user = await User.findById(req.user.id);
    const username = user.username;

    if (!title || !due) {
        return next(new AppError('Title and due date are required', 400));
    }

    const newTask = new Task({
        title,
        description,
        due,
        status: status || 'todo',
        username: username
    });
    
    await newTask.save();
    res.status(201).json({ 
        message: 'Task created successfully', 
        task: newTask 
    });
}));

router.get('/', verifyToken, catchAsync(async (req, res) => {
    const { sortBy, order, status } = req.query;

    const sortField = sortBy || 'due';
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortOptions = { [sortField]: sortOrder };

    const filterOptions = status ? { status } : {};

    const tasks = await Task.find(filterOptions).sort(sortOptions);
    res.json(tasks);
}));

router.get('/:id', verifyToken, catchAsync(async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return next(new AppError('Task not found', 404));
    }
    
    res.json(task);
}));

router.put('/:id', verifyToken, catchAsync(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(new AppError('Task not found', 404));
    }

    const allowedUpdates = ['title', 'description', 'due', 'status'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return next(new AppError('Invalid updates!', 400));
    }

    updates.forEach((update) => {
        task[update] = req.body[update];
    });
    await task.save();
    res.json({
        message: 'Task updated successfully',
        task: task.toJSON()
    });
}));

router.delete('/:id', verifyToken, catchAsync(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(new AppError('Task not found', 404));
    }
    await task.deleteOne();
    res.json({ 
        message: 'Task deleted successfully',
        task: task.toJSON()
    });
}));

export default router;