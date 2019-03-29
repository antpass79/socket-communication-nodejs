import { FeedService } from "./feed-service";
import { SocketClient } from "../../infrastructure-layer/sockets/socket-client";
import express = require("express");
import { NodeConfig } from "../../utilities/node-config";
import { Feed } from "../../models/feed";

export class FeedServiceHub {

    private _feedService: FeedService;
    private _socketClient: SocketClient;

    private _nodeConfig: NodeConfig = new NodeConfig();

    constructor(app: express.Application = express()) {
        this._feedService = new FeedService(app, this._nodeConfig.getValue('SERVER_SOCKET_PORT'));
        this._socketClient = new SocketClient(this._nodeConfig.getValue('CLIENT_SOCKET_ENDPOINT'));
    }

    public start() {
        this._socketClient.on('feedAdded', (feed: Feed) => {
            console.log('read-side feed to broadcast:');
            console.log(feed);
            this._feedService.broadcast(feed);
        });
    }
}