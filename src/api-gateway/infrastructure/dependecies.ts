import { ApiGatewayManagement } from "../aplication/use-cases/api-gateway-management";
import { ApiGatewayRepositoryImpl } from "./repositories/api-gateway.repository-impl";

const apiGatewayRespository = new ApiGatewayRepositoryImpl();
export const apiGatewayManagement = new ApiGatewayManagement(apiGatewayRespository);