import express from 'express';

import { userController } from '../dependencies';

const usersRoutes = express.Router();

usersRoutes.post("/",
    userController.add.bind(userController));

usersRoutes.post("/token",
    userController.authentication.bind(userController));

export default usersRoutes;