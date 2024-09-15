import express from 'express';
import { usersController } from '../dependencies';

const personsRoutes = express.Router();

personsRoutes.get("/",
    usersController.getList.bind(usersController));

personsRoutes.get("/:id",
    usersController.get.bind(usersController));

personsRoutes.post("/",
    usersController.add.bind(usersController));

personsRoutes.put("/:id",
    usersController.edit.bind(usersController));

export default personsRoutes;