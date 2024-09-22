import dotenv from 'dotenv';
import express, { Application } from 'express';

import { AppRoutes } from './api-gateway/infrastructure/api/app.routes';
import { Server } from './config/server';
import { DatabaseConfig } from './config/database';

import 'reflect-metadata';

async function main() {
    try {
        dotenv.config();
        const app: Application = express();
        const server = new Server(app);
        const appRoutes = new AppRoutes(app);
        const appConfig = new DatabaseConfig();

        await appConfig.getDatabase().authenticate();
        appRoutes.init();
        server.raise();
        return app;
    } catch (error) {
        console.debug(error);
    }
}

main();
