import dotenv from "dotenv";
import express, { Application } from 'express';

import { Server } from '../src/config/server';
import { AppRoutes } from "../src/api-gateway/infrastructure/api/app.routes";

import 'reflect-metadata';

dotenv.config();

export async function createApp(): Promise<Application> {
    try {
        const app: Application = express();
        const server = new Server(app);
        const appRoutes = new AppRoutes(app);
        appRoutes.init();
        return app;
    } catch (error) {
        console.debug(error);
        throw error;
    }
}
