import { ErrorHandlerService } from "../../../lib-core/services/error-handler.service";
import { ServiceManagement } from "../application/use-cases/service-management";
import { ServiceMiddleware } from "./middlewares/service.middleware";
import { ServicesController } from "./api/service.controller";
import { ServicesRepositoryImpl } from "./repositories/service.repository-impl";


const handlerError: ErrorHandlerService = new ErrorHandlerService();

// abstract

const servicesRepository = new ServicesRepositoryImpl();
const serviceManagement = new ServiceManagement(servicesRepository);

// dependencies

export const serviceMiddleware = new ServiceMiddleware();
export const serviceController = new ServicesController(serviceManagement, handlerError);