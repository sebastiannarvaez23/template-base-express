import express from "express";

import { userController, userMiddleware } from "../../../dependencies";

const usersRoutes = express.Router();

usersRoutes.post("/",
    userMiddleware.validateAdd.bind(userMiddleware),
    userController.add.bind(userController));

usersRoutes.post("/validate-credentials",
    userMiddleware.validateCredentialBody.bind(userMiddleware),
    userController.validateCredential.bind(userController));

export default usersRoutes;