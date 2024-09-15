import { EncryptionService } from "../services/encryption.service";
import { PersonManagement } from "../application/use-cases/person-management";
import { PersonsRepositoryImpl } from "./repositories/persons.repository-impl";
import { UserManagement } from "../application/use-cases/user-management";
import { UsersController } from "./api/users.controller";
import { UserSession } from "../application/use-cases/user-session";
import { UsersMiddleware } from "./api/users.middleware";
import { UsersRepositoryImpl } from "./repositories/users.repository-impl";

const encryptionService = new EncryptionService();
const usersRepository = new UsersRepositoryImpl();
const personsRepository = new PersonsRepositoryImpl();
const userSession = new UserSession(usersRepository);
const userManagement = new UserManagement(usersRepository, personsRepository);
const personManagement = new PersonManagement(personsRepository);

export const usersMiddleware = new UsersMiddleware();
export const usersController = new UsersController(userSession, userManagement, personManagement, encryptionService);
