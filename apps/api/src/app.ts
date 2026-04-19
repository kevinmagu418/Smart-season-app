import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import fieldRoutes from './routes/field.routes';
import dashboardRoutes from './routes/dashboard.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/fields', fieldRoutes);
app.use('/dashboard', dashboardRoutes);

app.use(errorHandler);

export default app;
