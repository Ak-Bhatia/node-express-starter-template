import express from 'express';
import { demoRouter } from './resources/demo/demo.router';

export const restRouter = express.Router();

restRouter.use('/demo', demoRouter);

