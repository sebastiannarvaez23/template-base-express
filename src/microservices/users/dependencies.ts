import { EncryptionUtil } from "../../lib-core/utils/encryption.util";
import { ErrorHandlerUtil } from "../../lib-core/utils/error-handler.util";
import { PersonManagement } from "./person/application/use-cases/person-management";
import { PersonsController } from "./person/infrastructure/api/persons.controller";
import { PersonsRepositoryImpl } from "./person/infrastructure/repositories/persons.repository-impl";
import { UserManagement } from "./user/application/use-cases/user-management";
import { UsersController } from "./user/infrastructure/api/users.controller";
import { UsersRepositoryImpl } from "./user/infrastructure/repositories/users.repository-impl";

const encryptionService: EncryptionUtil = new EncryptionUtil();
const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();

// abstract

const personsRepository = new PersonsRepositoryImpl();
const usersRepository = new UsersRepositoryImpl();

const personManagement = new PersonManagement(personsRepository);
const userManagement = new UserManagement(usersRepository, encryptionService);

// dependencies

export const personController = new PersonsController(personManagement, handlerError);
export const userController = new UsersController(userManagement, handlerError);