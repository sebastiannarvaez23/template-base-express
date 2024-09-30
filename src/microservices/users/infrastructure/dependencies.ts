import { EncryptionService } from "../../../lib-core/services/encryption.service";
import { ErrorHandlerService } from "../../../lib-core/services/error-handler.service";
import { PersonManagement } from "../application/use-cases/person-management";
import { PersonMiddleware } from "./middlewares/person.middleware";
import { PersonsController } from "./api/persons.controller";
import { PersonsRepositoryImpl } from "./repositories/persons.repository-impl";
import { UserManagement } from "../application/use-cases/user-management";
import { UserMiddleware } from "./middlewares/user.middleware";
import { UsersController } from "./api/users.controller";
import { UsersRepositoryImpl } from "./repositories/users.repository-impl";

const encryptionService: EncryptionService = new EncryptionService();
const handlerError: ErrorHandlerService = new ErrorHandlerService();
const personMiddleware: PersonMiddleware = new PersonMiddleware();
const userMiddleware: UserMiddleware = new UserMiddleware();

// abstract

const personsRepository = new PersonsRepositoryImpl();
const usersRepository = new UsersRepositoryImpl();

const personManagement = new PersonManagement(personsRepository);
const userManagement = new UserManagement(usersRepository, encryptionService);

// dependencies

export const personController = new PersonsController(personManagement, personMiddleware, handlerError);
export const userController = new UsersController(userManagement, userMiddleware, handlerError);