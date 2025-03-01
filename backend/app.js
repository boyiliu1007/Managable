import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import taskRoutes from './routes/task.js';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

app.use('/api/user', userRoutes);
app.use('/api/task', taskRoutes);

app.listen( process.env.PORT, () => {
    console.log('Server is running on http://localhost:' + process.env.PORT);
});