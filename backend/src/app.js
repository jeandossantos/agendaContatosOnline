import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { errorHandler } from './validation/errorHandler.js';
import { authRoutes } from './auth/authRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use('/auth', authRoutes);
app.use(errorHandler);

export { app };
