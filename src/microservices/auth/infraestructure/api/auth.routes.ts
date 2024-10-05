import express from "express";

import { authController } from "../dependencies";

const authRoutes = express.Router();

authRoutes.post("/token",
    authController.authentication.bind(authController));

authRoutes.post('/logout',
    authController.logout.bind(authController));

export default authRoutes;