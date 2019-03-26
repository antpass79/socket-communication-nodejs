import { FeedService } from "../services/feed-service";
import { Feed } from '../../models/feed';
import { FeedServiceHub } from "../services/feed-service-hub";

export class FeedController {

    constructor(private feedServiceHub: FeedServiceHub) {
    }

    async add(req: any, res: any) {

        let feed: Feed = req.body.feed;
        console.log('feed');
        console.log(feed);

        let result = await this.feedServiceHub.add(feed);
        console.log('result');
        console.log(result);

        if (result) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    }

    async remove(req: any, res: any) {

        let feedId: string = req.body.feedId;
        console.log('feedId');
        console.log(feedId);

        let result = await this.feedServiceHub.remove(feedId);
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