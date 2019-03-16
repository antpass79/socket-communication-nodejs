import { Feed } from '../../models/feed';
import { SocketServer } from '../../infrastructure-layer/sockets/socket-server';
import { NodeConfig } from '../../utilities/node-config';

export class FeedService {

  private socketServer: SocketServer = new SocketServer();

  constructor(port: string) {
    this.socketServer.listen(port);
  }

  broadcast(feed: Feed) {

    if (this.socketServer.isReady)
      this.socketServer.dispatchData<Feed>(feed, 'feedAdded');
  }
}