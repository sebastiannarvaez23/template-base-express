import { AuthController } from "./api/auth.controller";
import { AuthManagement } from "../application/use-cases/auth-management";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { AuthorizationMiddleware } from "./middlewares/authorization.middleware";
import { RedisConfig } from "../../../config/redis";
import { UsersRepositoryImpl } from "../../users/infrastructure/repositories/users.repository-impl";

const redisConfig = new RedisConfig();
const usersRepository = new UsersRepositoryImpl();
const authManagement = new AuthManagement(usersRepository);

export const authorizationMiddleware = new AuthorizationMiddleware();
export const authMiddleware = new AuthMiddleware(process.env.SECRET_KEY!, redisConfig);
export const authController = new AuthController(authManagement, redisConfig);