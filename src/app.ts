/* eslint-disable no-restricted-syntax */
import 'reflect-metadata';
import dotenv from 'dotenv';
import { IApiRouterDefinition } from '@global/IApi';
import express, { Express, Router } from 'express';
import cors from 'cors';
import controllers from './controllers';

dotenv.config();

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};

class App {
  public app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors(options));
    this.makeRouter();
  }

  makeRouter() {
    controllers.forEach((Controller) => {
      const router = Router();
      const instance = new Controller() as any;
      const routes: IApiRouterDefinition[] = Reflect.getMetadata('routes', Controller);
      const prefix: string = Reflect.getMetadata('prefix', Controller);

      for (const route of routes) {
        // eslint-disable-next-line no-return-await
        router[route.method](`${route.path}`, async (req, res) => await instance[String(route.controllerMethod)](req, res)).bind(instance);
      }
      this.app.use(prefix, router);
    });
  }
}

const { app } = new App();

export default app;
