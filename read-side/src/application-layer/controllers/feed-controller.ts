import { FeedService } from "../services/feed-service";
import { Feed } from '../../models/feed';

export class FeedController {

    async add(req: any, res: any) {

        let feed: Feed = req.body.feed;
        console.log('feed');
        console.log(feed);

        let feedService: FeedService = new FeedService();
        let result = await feedService.add(feed);
        console.log('result');
        console.log(result);

        if (result.ok) {
            console.log('Feed to send');
            console.log(result.insertedFeed);
            res.send(result.insertedFeed);
        }
        else {
            res.sendStatus(500);
        }
    }

    async remove(req: any, res: any) {

        let feedId: string = req.body.feedId;
        console.log('feedId');
        console.log(feedId);

        let feedService: FeedService = new FeedService();
        let result = await feedService.remove(feedId);
        console.log('result');
        console.log(result);

        if (result) {
            res.send(200);
        }
        else {
            res.sendStatus(500);
        }
    }
}