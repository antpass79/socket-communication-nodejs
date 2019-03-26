import { Feed } from '../../models/feed';
import { SocketServer } from '../../infrastructure-layer/sockets/socket-server';
import express = require('express');

export class FeedService {

  private socketServer: SocketServer;

  constructor(app: express.Application, port: string) {
    this.socketServer = new SocketServer(app);
    this.socketServer.listen(port);
  }

  broadcast(feed: Feed) {

    if (this.socketServer.isReady)
      this.socketServer.dispatchData<Feed>(feed, 'feedAdded');
  }
}