import { PersonManagement } from "../application/use-cases/person-management";
import { PersonsRepositoryImpl } from "./repositories/persons.repository-impl";
import { PersonsController } from "./api/users.controller";
import { PersonMiddleware } from "./api/person.middleware";

const personsRepository = new PersonsRepositoryImpl();
const personManagement = new PersonManagement(personsRepository);

export const usersMiddleware = new PersonMiddleware();
export const usersController = new PersonsController(personManagement);
