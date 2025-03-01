import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    due: {
        type: Date,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['todo', 'in_progress', 'done'],
        default: 'todo'
    },
    username: {
        type: String,
        required: true
    }
});

export default mongoose.model('Task', TaskSchema);