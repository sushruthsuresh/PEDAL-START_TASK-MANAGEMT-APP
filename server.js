const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample tasks data
let tasks = [
    { id: 1, title: 'Task 1', description: 'Description for Task 1', dueDate: '2024-05-10' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2', dueDate: '2024-05-15' }
];

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint to create a new task
app.post('/tasks', (req, res) => {
    const { title, description, dueDate } = req.body;
    const newTask = { id: tasks.length + 1, title, description, dueDate };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Endpoint to retrieve a single task by its ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
});

// Endpoint to update an existing task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    const { title, description, dueDate } = req.body;
    tasks[taskIndex] = { id: taskId, title, description, dueDate };
    res.json(tasks[taskIndex]);
});

// Endpoint to delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.json({ message: 'Task deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
