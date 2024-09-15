import apiGatewayRoutes from "./api-gateway.routes";
import cors from "cors";
import express, { Application, Request, Response, NextFunction } from "express";

import { RouteGroup } from "../../domain/entities/route-group.entity";
import personsRoutes from "../../../microservices/users/infrastructure/api/persons.routes";

export class AppRoutes {

  base: string = '/api/v1/';

  routeGroup: RouteGroup[] = [
    {
      path: '/api',
      router: apiGatewayRoutes
    },
    {
      path: `${this.base}person`,
      router: personsRoutes
    },
  ];

  constructor(private readonly _app: Application) { }

  init() {
    this.middlewares();
    this.routeGroup.forEach(route => this._app.use(route.path, route.router));
  }

  middlewares() {
    this._app.use(cors());
    this._app.use(express.json());
    this._app.use(express.static("public"));

    this._app.use((req: Request, res: Response, next: NextFunction) => {
      const originalJson = res.json.bind(res);

      res.json = (body?: any): Response => {
        let response: any = {
          data: body?.data || null,
          errors: []
        };
        if (body?.errors) {
          response.errors = Array.isArray(body.errors) ? body.errors : [body.errors];
        }
        if (typeof body === 'object' && body !== null) {
          const { errors, data, ...rest } = body;
          response.data = { ...response.data, ...rest };
        }
        return originalJson(response);
      };
      next();
    });
  }
}
