import express from 'express';
import * as bodyParser from "body-parser";
import cors from 'cors';

import { FeedRoute } from './application-layer/routes/feed-route';
import { NodeConfig } from './utilities/node-config';
import { MongoPool } from './infrastructure-layer/mongo-pool';
import { CreateFeedCommand, CreateFeedCommandHandler } from './domain-layer/commands/create-feed-command';
import { FeedServiceHub } from './application-layer/services/feed-service-hub';
//import { CommandBus } from './domain-layer/ddd/commands/command-bus';
import { CommandBus } from 'ddd-abstraction';
//let CommandBus = require('ddd-abstraction');

export class Server {

    private _port: number | string;
    get port() {
        return this._port;
    }

    private _app: express.Application;

    constructor(port: number | string) {
        this._port = port;

        this._app = express();

        this.configure(this._app);
    }

    async start() {

        await MongoPool.connect();

        this._app.listen(this.port, () => {
            console.log('Server listening on port ' + this.port);
        });
    }

    private configure(app: express.Application) {

        this.configParser(app);
        this.configCors(app);
        this.configureRoutes(app);
        this.registerCommands();
    }

    private configParser(app: express.Application) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }

    private configCors(app: express.Application) {

        let nodeConfig = new NodeConfig();

        let originsWhitelist = nodeConfig.getValue('ORIGINS_WHITE_LIST');
        let corsOptions = {
            origin: (origin: any, callback: any) => {
                var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
                callback(null, isWhitelisted);
            },
            credentials: true
        }
        app.use(cors(corsOptions));
    }

    private configureRoutes(app: express.Application) {

        let feedRoute = new FeedRoute();
        app.use('/feeds', feedRoute.initRoute(app));
    }

    private registerCommands() {
        let feedServiceHub: FeedServiceHub = new FeedServiceHub();
        CommandBus.register<CreateFeedCommand>(CreateFeedCommand.name, new CreateFeedCommandHandler(feedServiceHub));
    }
}