import { Server } from './config/server';
import database from "./config/database";
import dotenv from "dotenv";
import express, { Application } from 'express';

import 'reflect-metadata';

import { AppRoutes } from "./api-gateway/infrastructure/api/app.routes";

async function main() {
    try {
        dotenv.config();
        const app: Application = express();
        const server = new Server(app);
        const appRoutes = new AppRoutes(app);

        await database.authenticate();
        appRoutes.init();
        server.raise();
    } catch (error) {
        console.debug(error);
    }
}

main();