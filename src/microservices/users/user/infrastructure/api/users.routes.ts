import express from 'express';

import { userController } from '../../../dependencies';
import { userMiddleware } from '../../../../auth/infraestructure/dependencies';

const usersRoutes = express.Router();

usersRoutes.post("/",
    userMiddleware.validateAdd.bind(userMiddleware),
    userController.add.bind(userController));

export default usersRoutes;