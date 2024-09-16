import express from 'express';
import { personController } from '../dependencies';

const personsRoutes = express.Router();

personsRoutes.get("/",
    personController.getList.bind(personController));

personsRoutes.get("/:id",
    personController.get.bind(personController));

personsRoutes.post("/",
    personController.add.bind(personController));

personsRoutes.put("/:id",
    personController.edit.bind(personController));

export default personsRoutes;