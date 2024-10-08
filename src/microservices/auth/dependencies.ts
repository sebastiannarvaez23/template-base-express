import { AuthController } from "./infraestructure/api/auth.controller";
import { AuthManagement } from "./application/use-cases/auth-management";
import { AuthMiddleware } from "../../lib-core/middlewares/auth/auth.middleware";
import { AuthorizationMiddleware } from "../../lib-core/middlewares/auth/authorization.middleware";
import { AuthValidator } from "./application/validations/auth.validator";
import { EncryptionUtil } from "../../lib-core/utils/encryption.util";
import { ErrorHandlerUtil } from "../../lib-core/utils/error-handler.util";
import { PersonMiddleware } from "../users/person/infrastructure/middlewares/person.middleware";
import { RedisConfig } from "../../config/redis";
import { UserMiddleware } from "../users/user/infrastructure/middlewares/user.middleware";
import { UsersRepositoryImpl } from "../users/user/infrastructure/repositories/users.repository-impl";
import { PersonClientFeign } from "../../lib-client-feign/users/person.client";

const authValidator: AuthValidator = new AuthValidator();
const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();
const redisConfig: RedisConfig = new RedisConfig();
const encryptedService: EncryptionUtil = new EncryptionUtil();
const personClientFeign: PersonClientFeign = new PersonClientFeign();

// abstract

const usersRepository = new UsersRepositoryImpl();
const authManagement = new AuthManagement(usersRepository, encryptedService, redisConfig, personClientFeign);

// dependencies

export const authorizationMiddleware = new AuthorizationMiddleware();
export const authMiddleware = new AuthMiddleware(redisConfig, authValidator);
export const authController = new AuthController(authManagement, redisConfig, authMiddleware, handlerError);