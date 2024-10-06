import { AuthController } from "./api/auth.controller";
import { AuthManagement } from "../application/use-cases/auth-management";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { AuthorizationMiddleware } from "./middlewares/authorization.middleware";
import { AuthValidator } from "../application/validations/auth.validator";
import { EncryptionUtil } from "../../../lib-core/utils/encryption.util";
import { ErrorHandlerUtil } from "../../../lib-core/utils/error-handler.util";
import { PersonMiddleware } from "../../users/person/infrastructure/middlewares/person.middleware";
import { RedisConfig } from "../../../config/redis";
import { UserMiddleware } from "../../users/user/infrastructure/middlewares/user.middleware";
import { UsersRepositoryImpl } from "../../users/user/infrastructure/repositories/users.repository-impl";

const authValidator: AuthValidator = new AuthValidator();
const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();
const redisConfig: RedisConfig = new RedisConfig();
const encryptedService: EncryptionUtil = new EncryptionUtil();

// abstract

const usersRepository = new UsersRepositoryImpl();
const authManagement = new AuthManagement(usersRepository, encryptedService, redisConfig);

// dependencies

export const authorizationMiddleware = new AuthorizationMiddleware();
export const personMiddleware = new PersonMiddleware();
export const userMiddleware = new UserMiddleware();
export const authMiddleware = new AuthMiddleware(redisConfig, authValidator);
export const authController = new AuthController(authManagement, redisConfig, authMiddleware, handlerError);