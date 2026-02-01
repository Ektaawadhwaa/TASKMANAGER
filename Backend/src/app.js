import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks.js';
import authRoutes from './routes/auth.js';
const app = express();
app.use(
  cors({
    origin:[ 'http://localhost:5173',
    'https://taskmanager-1-u851.onrender.com',],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Task Manager running');
});

export default app;
