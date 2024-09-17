import { PersonManagement } from "../application/use-cases/person-management";
import { PersonMiddleware } from "./middlewares/person.middleware";
import { PersonsController } from "./api/persons.controller";
import { PersonsRepositoryImpl } from "./repositories/persons.repository-impl";

const personsRepository = new PersonsRepositoryImpl();
const personManagement = new PersonManagement(personsRepository);

export const usersMiddleware = new PersonMiddleware();
export const personController = new PersonsController(personManagement);