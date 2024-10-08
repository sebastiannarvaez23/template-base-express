import express from "express";

import { userController, userMiddleware } from "../../../dependencies";

const usersRoutes = express.Router();

usersRoutes.post("/",
    userMiddleware.validateAdd.bind(userMiddleware),
    userController.add.bind(userController));

export default usersRoutes;