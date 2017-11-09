import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import * as winston from 'winston';
import * as nocache from 'node-nocache';
import * as expresswinston from 'express-winston';
import { ToDoRouter } from './routes/todo.router';
import { MongooseConnection } from './config/mongoose.conf';
import { LogConfig } from './config/log-config';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        new LogConfig('D:/workshop/log');

        new MongooseConnection(mongoose);

        this.express = express();

        this.express.use(expresswinston.logger({
            winstonInstance: winston
        }));
        this.middleware();

        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        let router = express.Router();

        this.express.use('/api', nocache, router);

        // --- ROUTES ---
        router.use("/todo", new ToDoRouter().router);
    }
}

export default new App().express;