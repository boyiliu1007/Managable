import express from 'express';
import jwt from 'jsonwebtoken';
import Task from '../models/task.js';
import User from '../models/user.js'

const router = express.Router();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        // console.log(token.split(' ')[1]);
        // console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error){
        console.error("JWT Error:", error.message);
        res.status(401).json({ error: 'Access denied' });
    }
}


router.post('/add', verifyToken, async (req, res) => {
    try {
        // console.log(req.body);
        const { title, description = "", due, status } = req.body;
        const user = await User.findById(req.user.id);
        const username = user.username;
        // console.log(due);
        const newTask = new Task({
            title,
            description,
            due,
            status: status || 'todo',
            username: username
        });
        await newTask.save();
        res.status(201).json(newTask);
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
        res.json(task);
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
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;