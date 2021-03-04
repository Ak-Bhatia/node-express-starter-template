import express from 'express';
import { authRouter } from './resources/auth/auth.router';
import { demoRouter } from './resources/demo/demo.router';

export const restRouter = express.Router();

restRouter.use('/demo', demoRouter);
restRouter.use('/', authRouter);