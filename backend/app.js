import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';  // Import the CORS middleware

import userRoutes from './routes/user.js';
import taskRoutes from './routes/task.js';

dotenv.config();

const app = express();

// Enable CORS for your frontend URL
app.use(cors({
    origin: 'http://localhost:5173',  // Allow requests from this frontend URL
    methods: 'GET,POST,PUT,DELETE',  // Allowed methods (you can add more if needed)
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

// API routes
app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

// Start server
app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:' + process.env.PORT);
});
