import { RedisConfig } from "../../../config/redis";
import { UsersRepositoryImpl } from "../../users/infrastructure/repositories/users.repository-impl";
import { AuthManagement } from "../application/use-cases/auth-management";
import { AuthController } from "./api/auth.controller";

const redisConfig = new RedisConfig()
const usersRepository = new UsersRepositoryImpl();
const authManagement = new AuthManagement(usersRepository);

export const authController = new AuthController(authManagement, redisConfig);