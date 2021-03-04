import express from 'express';
import demoController from './demo.controller';

export const demoRouter = express.Router();
demoRouter.route('/')

    .get(demoController.getDemo)

    .post(demoController.addNewDemo);
 
demoRouter.route('/:demoid')

    .get(demoController.getDemoById)

    .put(demoController.updateDemo)

    .delete(demoController.deleteDemo);