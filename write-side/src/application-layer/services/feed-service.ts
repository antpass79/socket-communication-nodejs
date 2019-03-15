import { MongoClient } from 'mongodb';
import { FeedRepository } from '../../infrastructure-layer/repositories/feed-repository';
import { Feed } from '../../models/feed';
import { MongoPool } from '../../infrastructure-layer/mongo-pool';

export class FeedService {

  constructor() {
  }

  async add(feed: Feed): Promise<{ ok: boolean, insertedFeed: Feed }> {
    let feedRepository = new FeedRepository(MongoPool.instance, 'distributedfeeds');
    let insertedResult = await feedRepository.create(feed);

    let result = {
      ok: insertedResult.ok,
      insertedFeed: {
        id: insertedResult.insertedId,
        text: feed.text
      }
    };

    return result;
  }

  async remove(feedId: string): Promise<boolean> {
    let feedRepository = new FeedRepository(MongoPool.instance, 'distributedfeeds');
    return await feedRepository.delete(feedId);
  }
}