import express from 'express';

import { personController } from '../dependencies';

const personsRoutes = express.Router();

personsRoutes.get("/:id",
    personController.get.bind(personController));

personsRoutes.post("/",
    personController.add.bind(personController));

personsRoutes.delete("/:id",
    personController.delete.bind(personController));

export default personsRoutes;