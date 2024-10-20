import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { errorHandler } from './validation/errorHandler.js';
import { userRoutes } from './user/userRouter.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use('/auth', userRoutes);
app.use(errorHandler);

export { app };
