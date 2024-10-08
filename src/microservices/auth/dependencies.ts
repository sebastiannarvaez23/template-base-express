import { AuthController } from "./infraestructure/api/auth.controller";
import { AuthManagement } from "./application/use-cases/auth-management";
import { AuthMiddleware } from "../../lib-core/middlewares/auth/authenticate.middleware";
import { AuthorizationMiddleware } from "../../lib-core/middlewares/auth/authorization.middleware";
import { AuthValidator } from "./application/validations/auth.validator";
import { EncryptionUtil } from "../../lib-core/utils/encryption.util";
import { ErrorHandlerUtil } from "../../lib-core/utils/error-handler.util";
import { PersonClientFeign } from "../../lib-client-feign/users/person.client";
import { RedisConfig } from "../../config/redis";
import { UserClientFeign } from "../../lib-client-feign/users/users.client";


const authValidator: AuthValidator = new AuthValidator();
const handlerError: ErrorHandlerUtil = new ErrorHandlerUtil();
const redisConfig: RedisConfig = new RedisConfig();
const encryptedService: EncryptionUtil = new EncryptionUtil();
const personClientFeign: PersonClientFeign = new PersonClientFeign();
const userClientFeign: UserClientFeign = new UserClientFeign();

// abstract

const authManagement = new AuthManagement(encryptedService, redisConfig, personClientFeign, userClientFeign);

// dependencies

export const authorizationMiddleware = new AuthorizationMiddleware();
export const authMiddleware = new AuthMiddleware(redisConfig, authValidator);
export const authController = new AuthController(authManagement, authMiddleware, handlerError);