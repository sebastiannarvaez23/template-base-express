import { PersonManagement } from "../application/use-cases/person-management";
import { PersonsController } from "./api/persons.controller";
import { PersonsRepositoryImpl } from "./repositories/persons.repository-impl";
import { UserManagement } from "../application/use-cases/user-management";
import { UsersController } from "./api/users.controller";
import { UsersRepositoryImpl } from "./repositories/users.repository-impl";

const personsRepository = new PersonsRepositoryImpl();
const usersRepository = new UsersRepositoryImpl();

const personManagement = new PersonManagement(personsRepository);
const userManagement = new UserManagement(usersRepository);

export const personController = new PersonsController(personManagement);
export const userController = new UsersController(userManagement);