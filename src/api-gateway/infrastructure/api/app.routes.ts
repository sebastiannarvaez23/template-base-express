import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";

import { AuthMiddleware } from "../../../lib-core/middlewares/auth/authenticate.middleware";
import { AuthValidator } from "../../../microservices/auth/application/validations/auth.validator";
import { RedisConfig } from "../../../config/redis";
import { RouteGroup } from "../../domain/entities/route-group.entity";
import apiGatewayRoutes from "./api-gateway.routes";
import authRoutes from "../../../microservices/auth/infraestructure/api/auth.routes";
import personsRoutes from "../../../microservices/users/person/infrastructure/api/persons.routes";
import rolesRoutes from "../../../microservices/security/role/infraestructure/api/roles.routes";
import servicesRoutes from "../../../microservices/security/service/infraestructure/api/service.routes";
import usersRoutes from "../../../microservices/users/user/infrastructure/api/users.routes";

export class AppRoutes {

  private base: string = process.env.API_VERSION!;
  private redis: RedisConfig = new RedisConfig();
  private authValidator: AuthValidator = new AuthValidator();
  private authMiddleware: AuthMiddleware = new AuthMiddleware(this.redis, this.authValidator);

  private routeGroup: RouteGroup[] = [
    {
      path: '/api',
      router: apiGatewayRoutes
    },
    {
      path: `${this.base}/auth`,
      router: authRoutes
    },
    {
      path: `${this.base}/user`,
      router: usersRoutes
    },
    {
      path: `${this.base}/person`,
      router: personsRoutes
    },
    {
      path: `${this.base}/role`,
      router: rolesRoutes
    },
    {
      path: `${this.base}/service`,
      router: servicesRoutes
    },
  ];

  constructor(private readonly _app: Application) { }

  public init() {
    this.middlewares();
    this.routeGroup.forEach(route => {
      this._app.use(route.path, route.router);
    });
    this.errorHandlingMiddleware();
  }

  private middlewares() {
    this._app.use(cors());
    this._app.use(express.json());
    this._app.use(express.static("public"));

    this._app.use((req: Request, res: Response, next: NextFunction) => {
      const originalJson = res.json.bind(res);

      res.json = (body?: any): Response => {
        if (body?.errors) {
          let response: any = {
            errors: Array.isArray(body.errors) ? body.errors : [body.errors]
          };
          return originalJson(response);
        }
        return originalJson(body?.data || body || null);
      };
      next();
    });
  }

  private errorHandlingMiddleware() {
    this._app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const statusCode = err.statusCode || 500;
      const message = err.message || 'An unexpected error occurred';
      const internalCode = err.internalCode || 500;
      res.status(statusCode).json({
        data: null,
        errors: [{ internalCode, message }]
      });
    });
  }
}
