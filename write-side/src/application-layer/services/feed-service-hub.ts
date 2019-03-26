import { MongoClient } from 'mongodb';
import { FeedRepository } from '../../infrastructure-layer/repositories/feed-repository';
import { Feed } from '../../models/feed';
import { MongoPool } from '../../infrastructure-layer/mongo-pool';
import { FeedService } from './feed-service';
import { SocketServer } from '../../infrastructure-layer/sockets/socket-server';

export class FeedServiceHub {

  private feedService: FeedService = new FeedService();
  private socketServer: SocketServer = new SocketServer();

  constructor() {
    this.socketServer.listen();
  }

  async add(feed: Feed): Promise<boolean> {
    let result = await this.feedService.add(feed);
    if (result.ok) {
      console.log('Feed to send');
      console.log(result.insertedFeed);
      this.socketServer.addFeed(result.insertedFeed);
    }

    return result.ok;
  }

  async remove(feedId: string): Promise<boolean> {
    return this.feedService.remove(feedId);
  }
}