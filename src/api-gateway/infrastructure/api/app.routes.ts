import apiGatewayRoutes from "./api-gateway.routes";
import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";

import { RouteGroup } from "../../domain/entities/route-group.entity";
import personsRoutes from "../../../microservices/users/infrastructure/api/persons.routes";
import usersRoutes from "../../../microservices/users/infrastructure/api/users.routes";

export class AppRoutes {
  private base: string = '/api/v1/';

  private routeGroup: RouteGroup[] = [
    {
      path: '/api',
      router: apiGatewayRoutes
    },
    {
      path: `${this.base}person`,
      router: personsRoutes
    },
    {
      path: `${this.base}user`,
      router: usersRoutes
    },
  ];

  constructor(private readonly _app: Application) { }

  public init() {
    this.middlewares();
    this.routeGroup.forEach(route => this._app.use(route.path, route.router));
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
      res.status(statusCode).json({
        data: null,
        errors: [{ message }]
      });
    });
  }
}
