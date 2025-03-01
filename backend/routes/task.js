import express from 'express';
import Task from '../models/task.js';
import User from '../models/user.js'
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, description = "", due, status } = req.body;
        const user = await User.findById(req.user.id);
        const username = user.username;

        if (!title || !due) {
            return res.status(400).json({ error: 'Title and due date are required' });
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
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const { sortBy, order, status } = req.query;
        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === 'asc' ? 1 : -1;
        } else if (order) {
            sortOptions['due'] = order === 'asc' ? 1 : -1;
        } else {
            sortOptions = { due: 1 };
        }

        const filterOptions = {};
        if (status) {
            filterOptions.status = status;
        }

        const tasks = await Task.find(filterOptions).sort(sortOptions);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const allowedUpdates = ['title', 'description', 'due', 'status'];
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ error: 'Invalid updates!' });
        }

        updates.forEach((update) => {
            task[update] = req.body[update];
        });
        await task.save();
        res.json({
            message: 'Task updated successfully',
            task: task.toJSON()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.deleteOne();
        res.json({ 
            message: 'Task deleted successfully',
            task: task.toJSON()
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;