import express from 'express';

import { authController } from '../dependencies';

const authRoutes = express.Router();

authRoutes.post("/token",
    authController.authentication.bind(authController));

export default authRoutes;