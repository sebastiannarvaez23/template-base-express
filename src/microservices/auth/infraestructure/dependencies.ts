import { AuthController } from "./api/auth.controller";
import { AuthManagement } from "../application/use-cases/auth-management";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { AuthorizationMiddleware } from "./middlewares/authorization.middleware";
import { AuthValidator } from "../application/validations/auth.validator";
import { ErrorHandlerService } from "../../../lib-core/services/error-handler.service";
import { PersonMiddleware } from "../../users/infrastructure/middlewares/person.middleware";
import { RedisConfig } from "../../../config/redis";
import { UserMiddleware } from "../../users/infrastructure/middlewares/user.middleware";
import { UsersRepositoryImpl } from "../../users/infrastructure/repositories/users.repository-impl";

const authValidator: AuthValidator = new AuthValidator();
const handlerError: ErrorHandlerService = new ErrorHandlerService();
const redisConfig = new RedisConfig();

// abstract

const usersRepository = new UsersRepositoryImpl();
const authManagement = new AuthManagement(usersRepository);

// dependencies

export const authorizationMiddleware = new AuthorizationMiddleware();
export const personMiddleware = new PersonMiddleware();
export const userMiddleware = new UserMiddleware();
export const authMiddleware = new AuthMiddleware(redisConfig, authValidator);
export const authController = new AuthController(authManagement, redisConfig, authMiddleware, handlerError);