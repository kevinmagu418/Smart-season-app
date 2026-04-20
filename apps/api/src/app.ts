import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import fieldRoutes from './routes/field.routes';
import dashboardRoutes from './routes/dashboard.routes';
import { ENV } from './config/env';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors({
  origin: ENV.FRONTEND_URL,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/auth', authRoutes);
app.use('/fields', fieldRoutes);
app.use('/dashboard', dashboardRoutes);

app.use(errorHandler);

export default app;
